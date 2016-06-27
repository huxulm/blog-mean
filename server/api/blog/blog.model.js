'use strict';

import mongoose from 'mongoose';

var BlogSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  title: String,
  info: String,
  images:[
    {
      url: String,
    }
  ],
  markdown: String,
  html: String,
  author: [
    {name: {type: String, default: 'unknown'}}
  ],
  category: String,

  create_time: {type: Date, default: Date.now},
  modify_time: {type: Date},
  create_user: String,
  modify_user: String,
  active: Boolean,
});

export default mongoose.model('Blog', BlogSchema);
