'use strict';

import mongoose from 'mongoose';

var BlogSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: {type: String, default: 'No Title'},
  info: String,
  images:[
    {
      url: String,
    }
  ],
  content: String,
  markdown: String,
  html: String,
  author: [
    { id: mongoose.Schema.Types.ObjectId, 
      name: {type: String, default: 'unknown'},
    }
  ],
  category: String,

  create_time: {type: Date, default: Date.now},
  modify_time: {type: Date},
  create_user: {type: String, default: 'SNOOPY'},
  modify_user: String,
  active: {type: Boolean, default: true},
});

export default mongoose.model('Blog', BlogSchema);
