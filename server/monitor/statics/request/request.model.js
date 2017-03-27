/**
 * Created by xulingming on 2017/3/27.
 */
'use strict';
import mongoose from 'mongoose';
import async from 'async';
import Promise from 'bluebird';

var RequestSchema = new mongoose.Schema({
  baseUrl: {type: String},
  hostName: {type: String},

  // Contains the remote IP address of the request
  ip: {type: String},

  method: {type: String},

  originalUrl: {type: String},

  protocol: {type: String},

  xhr: {type: Boolean, default: false},

  create_time: {type: Date, default: Date.now}

});

export default mongoose.model('Request', RequestSchema);
