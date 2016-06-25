'use strict';

import mongoose from 'mongoose';

var BlogSchema = new mongoose.Schema({
  id: ObjectId,
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
    {
      id: ObjectId,
      name:String,
    }
  ],
  category: String,

  create_time: Date,
  modify_time: Date,
  create_user: String,
  modify_user: String,
  active: Boolean,
});

export default mongoose.model('blog', BlogSchema);
