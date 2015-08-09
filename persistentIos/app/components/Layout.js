'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
} = React;
var ddpClient = require('../db/lib/ddp-client');
var Items = require('../db/Items');

var Layout = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
    };
  },

  componentWillMount: function() {
    var self = this;
    ddpClient.initialize()
      .then(function() {
        return Items.observe();
      })
      .then(function() {
        return ddpClient.subscribe('items');
      })
      .then(function() {
        return Items.findLocal();
      })
      .then(function(res) {
        self.setState({
          dataSource: self.state.dataSource.cloneWithRows(res)
        });
      });
  },

  componentWillUnmount: function() {
    ddpClient.close();
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );
  },

  _renderRow: function(rowData) {
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.text}>
            {rowData.sentence}
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});

module.exports = Layout;
