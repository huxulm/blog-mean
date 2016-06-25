/**
 * blog model events
 */

'use strict';

import {EventEmitter} from 'events';
import blog from './blog.model';
var blogEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
blogEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  blog.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    blogEvents.emit(event + ':' + doc._id, doc);
    blogEvents.emit(event, doc);
  }
}

export default blogEvents;
