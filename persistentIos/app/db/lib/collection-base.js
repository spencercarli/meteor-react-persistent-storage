"use strict";
var ddpClient = require('./ddp-client');
var _ = require('underscore');

class Collection {
  constructor(name) {
    this.name = name;
  }

  observe (action) {
    var observer = ddpClient._connection.observe(this.name);
    observer.added = function(id) {
      action && action();
    };
    observer.changed = function(id, oldFields, clearedFields, newFields) {
      action && action();
    };
    observer.removed = function(id, oldValue) {
      action && action();
    };
    return observer;
  }

  find(query, options) {
    if (options) {
      console.warn('options not supported.');
    }
    query = _.isObject(query) ? query : {};

    var collection = ddpClient._collections[this.name];
    return _.where(collection, query);
  }

  findOne(query, options) {
    return this.find(query, options)[0];
  }

};

module.exports = Collection;
