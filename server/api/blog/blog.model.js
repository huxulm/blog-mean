'use strict';

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

var BlogSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  title: {type: String, default: 'No Title'},
  html_content: String,
  md_content: String,
  text_content: String,
  content: String,
  markdown: String,
  html: String,
  author: String,
  author_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  tags: [
    {
      tag_id: {
        type: mongoose.Schema.Types.ObjectId
      }
    }
  ],
  praise_count: Number,
  pictures: [
    {
      image_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      url: {
        type: String,
      }
    }
  ],
  write_date: Date,
  last_edit_date: Date,
  create_time: {type: Date, default: Date.now},
  modify_time: {type: Date, default: Date.now},
  is_delete: {type: String, default: 'Y'}
});

BlogSchema.plugin(mongoosePaginate);
export default mongoose.model('Blog', BlogSchema);
