/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/comments              ->  index
 * POST    /api/comments              ->  create
 * GET     /api/comments/:id          ->  show
 * PUT     /api/comments/:id          ->  update
 * DELETE  /api/comments/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Comment from './comment.model';
import Util from '../util';


function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;

  return function (entity) {
    if(entity) {
      res.status(statusCode).json(entity);
    }
  }
}

function beautifyResponse(res) {
  return function (entity) {
    return Util.convertDateWithFormat(entity);
  }
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
      return updated.save()
        .then(updated => {
          return updated;
        });
  }
}

function removeEntity(res) {
  return function (entity) {
    if(entity) {
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

// Get a list of comments by _id and blog_id
export function index(req, res) {
  return Comment.find(queryByIdAndBlogId(req, res)).exec()
    .then(responseWithResult(res))
    .then(beautifyResponse(res))
    .catch(handleError(res));
}

function queryByIdAndBlogId(req, res) {
  console.log('Query by id.....................');
  var queryCondition = {$eq: {}};
  if(req.id) {
    queryCondition.$eq._id = req._id;
  }
  if(req.blog_id) {
    queryCondition.$eq.blog_id = req.blog_id;
  }
  return function (q) {
    return queryCondition;
  };
}

// Get a single comment from the DB
export function show(req, res) {
  return Comment.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Create a new Comment in the DB
export function create(req, res) {
  // console.log('创建comment请求参数:' + JSON.stringify(req));
  return Comment.create(Util.convertId2ObjectID(req.body))
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Update a existing Comment in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Comment.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(beautifyResponse(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Comment from the DB
export function destroy(req, res) {
  return Comment.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
