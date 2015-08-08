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

var persistentIos = React.createClass({
  render: function() {
    return <Layout />;
  }
});

AppRegistry.registerComponent('persistentIos', () => persistentIos);
