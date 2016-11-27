'use strict';

import mongoose from 'mongoose';
import moment from 'moment';
import _ from 'lodash';
var _object = require('lodash/fp/object');

var Util = {};

/**
 * convert string id to ObjectId
 * @param entity
 * @returns {*}
 */
Util.convertId2ObjectID = function (entity) {
  try {
    for (var attr in entity) {
      if (typeof (entity[attr]) == 'string') {
        if (entity[attr]
          && attr.toString().length >= 3
          && attr.toString().endsWith('_id')) {
          // console.log('<1>%s<2>%s<3>%s', attr, attr.toString(), attr.indexOf('_id'));
          entity[attr] = new mongoose.Types.ObjectId(entity[attr]);
          // console.log('convert string id 2 objectID: %s --> %s', entity[attr], entity[attr]);
        }
      }
    }
  } catch (e) {
    console.log('id convert happened wrong:' + e);
  } finally {
    return entity;
  }
}

Util.convertDateWithFormat = function (entity) {
  var nwEntity = entity;
  console.log('< 1 >-----------------------------------' + JSON.stringify(nwEntity));
  try {
    var format = 'YYYY/MM/DD HH:mm:ss';
    for (var attr in entity) {
      nwEntity[attr] = entity[attr];
      if (_.isDate(entity[attr])) {
        // var d = new Date(entity[attr]);
        // var formatTimestamp = JSON.stringify(moment(d).format(format));
        nwEntity.what = "formatTimestamp";
        break;
      }
    }
    nwEntity.remark = 'Hi whats wrong?';
  } catch (e) {
    console.log('convert date object happened wrong:' + e.toString());
  } finally {
    console.log('< 2 >-----------------------------------' + JSON.stringify(nwEntity));
    return nwEntity;
  }
}
module.exports = Util;
