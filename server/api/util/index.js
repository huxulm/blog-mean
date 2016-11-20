'use strict';

import mongoose from 'mongoose';

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
          console.log('<1>%s<2>%s<3>%s', attr, attr.toString(), attr.indexOf('_id'));
          entity[attr] = new mongoose.Types.ObjectId;//(entity[attr]);
          console.log('convert string id 2 objectID: %s --> %s', entity[attr], entity[attr]);
        }
      }
    }
  } catch (e) {
    console.log('id convert happened wrong:' + e);
  } finally {
    return entity;
  }
}
module.exports = Util;
