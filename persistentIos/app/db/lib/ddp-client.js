var DDPClient = require("ddp-client");
var React = require("react-native");
var _ = require("underscore");
var {
  AsyncStorage
} = React;

var ddpClient = new DDPClient({
  host : "localhost",
  port : 3000,
  ssl  : false,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1',
  useSockJs: true,
});

var ddpMethods = {};

ddpMethods._collections = ddpClient.collections;
ddpMethods._connection = ddpClient;

// Initialize a connection with the server
ddpMethods.initialize = function () {
  return new Promise(function(resolve, reject) {
    ddpClient.connect(function(error, wasReconnect) {
      // If autoReconnect is true, this back will be invoked each time
      // a server connection is re-established
      if (error) {
        console.log('DDP connection error!');
        reject(error);
      }

      if (wasReconnect) {
        console.log('Reestablishment of a connection.');
      }

      console.log('connected!');
      resolve(true);
    });
  });
};

// Close the ddp connection
ddpMethods.close = function () {
  console.log('disconnected');
  ddpClient.close();
};

// Method to subscribe
ddpMethods.subscribe = function(pubName, params) {
  params = params || undefined;
  if (params && !_.isArray(params)) {
    console.warn('Params must be passed as an array to ddp.subscribe');
  }
  return new Promise(function(resolve, reject) {
    ddpClient.subscribe(pubName, params, function () {
      resolve(true);
    });
  });
};

// Method to make calls
ddpMethods.call = function(methodName, params) {
  params = params || undefined;
  if (params && !_.isArray(params)) {
    console.warn('Params must be passed as an array to ddp.call');
  }

  return new Promise(function(resolve, reject) {
    ddpClient.call(methodName, params,
      function (err, result) {   // callback which returns the method call results
        // console.log('called function, result: ' + result);
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
      function () {              // callback which fires when server has finished
        // console.log('updated');  // sending any updated documents as a result of
        // console.log(ddpclient.collections.posts);  // calling this method
      }
    );
  });
};

module.exports = ddpMethods;
