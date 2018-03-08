import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/login.js';

export default class App extends React.Component {
  render() {
    return (
     <Login />
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
