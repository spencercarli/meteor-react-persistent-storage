/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;
var Layout = require('./app/components/Layout');
var seed = require('./app/db/seed');

var persistentIos = React.createClass({
  render: function() {
    console.log(seed);
    return <Layout />;
  }
});

AppRegistry.registerComponent('persistentIos', () => persistentIos);
