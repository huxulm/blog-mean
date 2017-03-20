/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/categorys              ->  index
 * POST    /api/categorys              ->  create
 * GET     /api/categorys/:id          ->  show
 * PUT     /api/categorys/:id          ->  update
 * DELETE  /api/categorys/:id          ->  destroy
 */

'use strict';
import env from '../../config/environment';

export function upload(req, res, next) {
  console.log(req.files);
  req.files.forEach(function (item, index, array) {
    req.files[index].url = env.baseUrl + '/imgs/' + item.filename;
  });
  res.status(200).json({status: '1', data: req.files});
}


