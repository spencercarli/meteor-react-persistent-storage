"use strict";
var AsyncStorage = require("react-native").AsyncStorage;
var ddpClient = require('./ddp-client');
var _ = require('underscore');

class Collection {
  constructor(name) {
    this.name = name;
    this.local = AsyncStorage;
  }

  observe (action) {
    var self = this;
    var observer = ddpClient._connection.observe(this.name);

    var updateLocal = function() {
      var values = JSON.stringify(ddpClient._collections[self.name]);
      self.local.setItem(self.name, values);
    };

    observer.added = function(id) {
      updateLocal();
      action && action();
    };
    observer.changed = function(id, oldFields, clearedFields, newFields) {
      updateLocal();
      action && action();
    };
    observer.removed = function(id, oldValue) {
      updateLocal();
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

  findLocal(query, options) {
    var self = this;
    if (options) {
      console.warn('options not supported.');
    }
    return new Promise(function(resolve, reject) {
      self.local.getItem(self.name)
        .then(function(res) {
          var collection = JSON.parse(res);

          query = _.isObject(query) ? query : {};
          resolve(_.where(collection, query));
        })
    });
  }

  findOne(query, options) {
    return this.find(query, options)[0];
  }

  findOneLocal(query, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
      resolve(self.find(query, options)[0]);
    });
  }

};

module.exports = Collection;
