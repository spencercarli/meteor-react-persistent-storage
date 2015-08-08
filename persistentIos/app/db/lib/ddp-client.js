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

module.exports = ddpMethods;
