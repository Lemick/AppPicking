import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    email: t.String,
    username: t.String,
    password: t.String,
    terms: t.Boolean
})

export default class Login extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Form type={User} />
        </View>
      );
    }
  }


  
    const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    });
  