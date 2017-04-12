/**
 * Created by xulingming on 2017/4/10.
 */
'use strict';

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

/**
 * 相册目录SCHEMA
 */
var AlbumItemSchema = new mongoose.Schema({
  a_id: {type: mongoose.Schema.Types.ObjectId, ref: 'AlbumDir'},
  name: String,
  url: String,
  describe: String,
  image_type: {type: String},
  last_upload_time: {type: Date, default: Date.now},
  create_time: {type: Date, default: Date.now},
  modify_time: Date,
  is_delete: {type: String, default: 'N'}
});
AlbumItemSchema.plugin(mongoosePaginate);
export default mongoose.model('AlbumItem', AlbumItemSchema);
