/**
 * Created by xulingming on 2017/3/27.
 */
/**
 * Created by xulingming on 2017/3/27.
 */
'use strict';
import mongoose from 'mongoose';
import async from 'async';
import Promise from 'bluebird';

var LoginSchema = new mongoose.Schema({

  uid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

  uname: {type: String},

  // Contains the remote IP address of the request
  ip: {type: String},

  login_count: {type: Number, default: 0},

  today_login: {type: Number, default: 0},

  last_login: {type: Date, default: Date.now},

  create_time: {type: Date, default: Date.now}

});

export default mongoose.model('Login', LoginSchema);
