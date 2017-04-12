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
import compose from 'composable-middleware';
import Upload from './upload.model';
import AlbumItem from  './album/albumItem.model';
import AlbumDir from  './album/albumDir.model';
import CONSTS from '../../config/app_constants';

export function upload() {
  return compose()
    .use(function uploadLog(req, res, next) {

      let uploads = [];
      if (req.files) {
        req.files.forEach(function (f) {
          uploads.push({
            uid: req.user._id,
            file_name: f.filename,
            url: f.url,
            description: req.query.desc || f.originalname
          });
        });
      }
      Upload.create(uploads)
        .then(function (uploads) {
          console.log('Upload log:', uploads || '');
          req.uploads = uploads;
          next();
          return uploads;
      }).catch(function (err) {
        console.log('Upload err:', err || '');
        res.status(401).json({status: '0', data: err.toLocaleString()});
      });
    })
    .use(function (req, res, next) {
      console.log('upload query string:' + JSON.stringify(req.query));
      console.log(req.files);
      req.files.forEach(function (item, index, array) {
        req.files[index].url = env.baseUrl + '/imgs/' + item.filename;
      });
      res.status(200).json({status: '1', data: {files: req.files, uploads: req.uploads}});
    });
}
