/**
 * Created by xulingming on 2017/4/9.
 */
'use strict';

import mongoose from 'mongoose';

var UploadFileSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  file_name: String,
  url: String,
  describe: String,
  upload_time: {type: Date, default: Date.now},
  create_time: {type: Date, default: Date.now},
  modify_time: Date,
  is_delete: {type: String, default: 'N'}
});

export default mongoose.model('UploadFile', UploadFileSchema);
