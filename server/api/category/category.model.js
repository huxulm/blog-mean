'use strict';

import mongoose from 'mongoose';

var CategorySchema = new mongoose.Schema({
  name: String,
  level: String,
  describe: String,
  create_time: {type: Date, default: Date.now},
  modify_time: Date,
  is_delete: {type: String, default: 'Y'}
});

export default mongoose.model('Category', CategorySchema);
