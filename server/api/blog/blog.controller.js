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
import APP_CONSTS from '../../config/app_constants';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function shortBlogContent() {
  return function (entity) {
    if(entity) {
      for (var index = 0; index < entity.length; index++) {
        // console.log('Blog index ' + index + ': ' + entity[index]);
        // entity[index].content = entity[index].content.subString(0, 10);
        if(entity[index].content) {
          console.log( "shorted blog string: " + entity[index].content.substring(0, 50));
          entity[index].content = entity[index].content.substring(0, APP_CONSTS.BLOG_LIST_CONTENT_LENGTH_LIMIT);
          console.log('Type of time :' + (typeof entity[index].create_time));
        }
      }
    }
    return entity;
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
  return Blog.paginate({}, queryCondition)
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single Blog from the DB
export function show(req, res) {
  return Blog.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Blog in the DB
export function create(req, res) {
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
