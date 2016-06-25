'use strict';

import mongoose from 'mongoose';

var CategorySchema = new mongoose.Schema({
  id: ObjectId,
  name: String,
  create_time: Date,
  modify_time: Date,
  create_user: String,
  modify_user: String,
  active: Boolean
});

export default mongoose.model('Category', CategorySchema);
