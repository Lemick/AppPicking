import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/components/login.js';
import PickingScreen from './src/components/PickingScreen';
import { StackNavigator } from 'react-navigation';


const NavigatorApp = StackNavigator({
  Login: { screen: LoginScreen },
  Picking: { screen: PickingScreen },
},
  { headerMode: 'screen' }
);

export default class App extends React.Component {


  // Load fonts before app rendering
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    console.log('Lancement de l\'app..');
  }

  render() {
    return (
      <NavigatorApp />
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
