/**
 * Created by xulingming on 2017/4/10.
 */
'use strict';

import mongoose from 'mongoose';
import mongoosepaginate from 'mongoose-paginate';
/**
 * 相册目录SCHEMA
 */
var AlbumDirSchema = new mongoose.Schema({
  uid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  url: String,
  describe: String,
  last_upload_time: {type: Date, default: Date.now},
  create_time: {type: Date, default: Date.now},
  modify_time: Date,
  is_delete: {type: String, default: 'N'}
});
AlbumDirSchema.plugin(mongoosepaginate);
export default mongoose.model('AlbumDir', AlbumDirSchema);
