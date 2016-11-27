'use strict';

import mongoose from 'mongoose';

var CommentSchema = new mongoose.Schema({
  content: {type: String},
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  praise_count: {type: Number},
  blog_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  comment_date: {type: Date, default: Date.now},
  create_time: {type: Date, default: Date.now},
  modify_time: {type: Date, default: Date.now},
  is_delete: {type: String, default: 'Y'},
});

export default mongoose.model('Comment', CommentSchema);
