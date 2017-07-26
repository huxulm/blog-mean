/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/blogs              ->  index
 * POST    /api/blogs              ->  create
 * GET     /api/blogs/:id          ->  show
 * PUT     /api/blogs/:id          ->  update
 * DELETE  /api/blogs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Blog from './blog.model';
import Tag from './tag/tag.model';
import User from '../user/user.model';
import APP_CONSTS from '../../config/app_constants';
import ERR from '../../components/SNOOPY_ERROR';
import mongoose from 'mongoose';
import async from 'async';
import Promise from 'bluebird';

var ObjectId = mongoose.Types.ObjectId;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      /*let tagPromises = _.pick(entity, '$tagPromises');
      console.log('Picked promises: ' + JSON.stringify(tagPromises || {}));*/
/*      delete entity.$tagPromises;
      delete entity.docs;*/
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function shortBlogContent() {
  return function (entity) {
    if(entity && entity.docs) {
      for (var index = 0; index < entity.docs.length; index++) {
        // console.log('Blog index ' + index + ': ' + entity[index]);
        // entity[index].content = entity[index].content.subString(0, 10);
        if(entity.docs[index].html_content && entity.docs[index].html_content.length > APP_CONSTS.BLOG_LIST_CONTENT_LENGTH_LIMIT) {
          entity.docs[index].html_content = entity.docs[index].html_content.substring(0, APP_CONSTS.BLOG_LIST_CONTENT_LENGTH_LIMIT);
        }
      }
    }
    return entity;
  }
}

function fillTagEntity() {
  return function (entity) {
    entity.$tagPromises = [];
    if (entity && entity.docs) {
      for (var idx = 0; idx < entity.docs.length; idx++) {
        let blogTagIds = _.map(entity.docs[idx]['tags'], 'tag_id');
        entity.$tagPromises.push({_blogId: entity.docs[idx]._id, tagPromise:
          Tag.find({_id: {$in: blogTagIds || []}}).exec(), tagIds: blogTagIds});
      }
    }
    return entity;
  }
}

function fillAuthor() {
  return function (entity) {
    entity.authorPromises = [];
    if (entity && entity.docs && Array.isArray(entity.docs)) {
      entity.docs.forEach(function (e) {
        entity.authorPromises.push({_blog_id: e._id, $p: User.findOne({_id: e.author_id}).select(['name']).exec()});
      });
    }
    return Promise.all(_.map(entity.authorPromises, '$p') || []).then(function (rs) {
      return entity;
    });
  }
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Blogs
export function index(req, res) {
  return Blog.find().exec()
    .then(shortBlogContent())
    .then(fillTagEntity())
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * build pagination query condition
 * @param req
 */
function buildPageQuery(req) {
  var query = {};
  var firstPageIdx = "1";
  var defaultLimit = 10;
  query.page = _.isEmpty(req.query.page) ?  firstPageIdx : req.query.page;
  query.limit = _.isEmpty(req.query.limit) ? defaultLimit : Number(req.query.limit);
  console.log("query condition:" + JSON.stringify(query));
  return query;
}

export function page(req, res) {
  console.log('request params:' + JSON.stringify(req.query));
  var queryCondition = buildPageQuery(req);
  // 默认倒序
  queryCondition = _.merge(queryCondition, {sort: {"_id": -1}});
  console.log('Sort:' + JSON.stringify(queryCondition));
  return Blog.paginate({}, queryCondition)
    .then(fillAuthor())
    .then(function (entity) {
      // full filled
      // replace tags
      let docs = [];
      entity.docs.forEach(function (e) {
        let authorPromise = _.find(entity.authorPromises, {_blog_id: e._id});
        if (authorPromise) {
          docs.push(_.merge({
            _id: e._id,
            title: e.title,
            html_content: e.html_content,
            modify_time: e.modify_time,
            create_time: e.create_time,
            tags: e.tags
          }, {author: authorPromise.$p.value()}));
        }
      });
      let retEntity = {docs: docs, limit: entity.limit, total: entity.total, page: entity.page, pages: entity.pages};
      return retEntity;
    })
    .then(fillTagEntity())
    .then(function (entity) {
      return Promise.all(_.map(entity.$tagPromises, 'tagPromise')).then(function (rs) {
        return entity;
      });
    })
    .then(function (entity) {
      // replace tags
      let docs = [];
      entity.docs.forEach(function (e) {
        delete e.tags;
        let $findTagPromise = _.find(entity.$tagPromises, {_blogId:e._id});
        if ($findTagPromise) {
          docs.push(_.merge(e, {tags: $findTagPromise.tagPromise.value()}));
        }
      });
      // console.log('Processed docs:============>>' + JSON.stringify(docs));
      let retEntity = {docs: docs, limit: entity.limit, total: entity.total, page: entity.page, pages: entity.pages};
      return retEntity;
    })
    .then(shortBlogContent())
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function tags(req, res) {
  return Tag.paginate({}, {sort: {tag: "asc"}})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Blog from the DB
export function show(req, res) {
  return Blog.findById(req.params.id).exec()
    .then(fillTags(res))
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function fillTags(res) {
  return function (entity) {
    console.log('获取blog' + JSON.stringify(entity));
    let tagIds = _.map(entity.tags, 'tag_id');
    console.log('IDS: ======>' + JSON.stringify(tagIds));
    return Tag.find({_id: {$in: tagIds}}).exec()
      .then(function (tags) {
        console.log('All tags:=====>' + JSON.stringify(tags));
        _.merge(entity.tags, tags);
        console.log('Merged获取blog' + JSON.stringify(entity));
      return entity;
    });
  }
}

// Creates a new Blog in the DB
export function create(req, res) {
  var body = req.body;
  if (!validaeBlogPost(req, res)){
     return;
  }
  return Blog.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Blog in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Blog.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Blog from the DB
export function destroy(req, res) {
  return Blog.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

function validaeBlogPost(req, res) {
  console.log('blog content:' + (req.body ? JSON.stringify(req.body) : 'body is empty'));
  console.log('content-type:' + req.get('Content-Type'));
  if (!req.body || !req.body.md_content || !req.body.author || !req.body.html_content || !req.body.author_id) {
    res.status(200)
      .json(ERR._E_BLOG_POST_ILLEGAL_PARAMS);
    return false;
  }
  return true;
}
