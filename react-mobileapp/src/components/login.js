//https://github.com/gcanti/tcomb-form-native

import { ScrollView, TextInput } from "react-native-gesture-handler";
import Container from "./Container";
import Label from "./Label";
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';

var Form = t.form.Form;

var Person = t.struct({
    Utilisateur: t.String,              // a required string
    'Mot de passe': t.String  // password
  });

var options = {
    fields:{
        'Mot de passe':{
            password: true,
            secureTextEntry: true
        }
    }
};

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                {/* display */}
                <Text style={styles.title}> HuitNeufDis </Text>
                <Form
                    ref="form"
                    type={Person}
                    options = {options}
                />
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>      
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 100,
        padding: 20,
        backgroundColor: '#ffffff',
      },
      title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 60
      },
      buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
      },
      button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
      },
});