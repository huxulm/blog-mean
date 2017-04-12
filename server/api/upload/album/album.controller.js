/**
 * Created by xulingming on 2017/4/10.
 */
'use strict';

import _ from 'lodash';
import AlbumDir from './albumDir.model';
import AlbumItem from './albumItem.model';
import CONSTS from '../../../config/app_constants';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of album
export function index(req, res) {
  return AlbumDir.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a specific item of albums
export function show(req, res) {
  if (_.isEmpty(req.query.type)) {
    return res.status(200).json(errorParams(-1, '参数type为空'));
  }
  if (req.query.type === CONSTS.upload.albumDir) {
    return AlbumDir.find({_id: req.params.id}).exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
  } else if (req.query.type === CONSTS.upload.albumItem){
    return AlbumItem.find({_id: req.params.id}).exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res));
  } else {
    return res.status(200).json(errorParams(-1, 'type错误'));
  }
}

// Creates a new AlbumDir in the DB
export function createAlbumDir(req, res) {
  if (!req.body) {
    return res.status(200).json(errorParams(-1));
  }
  return AlbumDir.create(req.nwAlubmDirs || req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function createAlbumItem(req, res) {
  return AlbumItem.create(req.nwAlubmItems || req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * 参数错误返回
 * @param status
 * @param msg
 * @param data
 * @returns {{status: (*|number), msg: (*|string), data: (*|Array)}}
 */
function errorParams(status, msg, data) {
  return {
    status: status || -1,
    msg: msg || '参数错误',
    data: data || []
  }
}
