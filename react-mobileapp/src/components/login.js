//https://github.com/gcanti/tcomb-form-native

import { ScrollView, TextInput } from "react-native-gesture-handler";
import Container from "./Container";
import Label from "./Label";
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Picker } from 'react-native';
import t from 'tcomb-form-native';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          state: 'Java'
        }
      }

    render() {
        return (
            <View style={styles.container}>
                {/* display */}
                <Text style={styles.title}> HuitNeufDis </Text>
                <Text style={styles.titlePicker}> Selectionnez votre profil : </Text>
                <Picker
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Pierrot" value="pierre" />
                    <Picker.Item label="Michel" value="michel" />
                    <Picker.Item label="Jacques" value="jacques" />
                    <Picker.Item label="Pierre-Henry" value="ph" />
                    <Picker.Item label="Jean Dujardin" value="jd" />
                </Picker>
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Se Connecter</Text>
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
        marginBottom: 110
      },
      titlePicker: {
        fontSize: 20,
        alignSelf: 'center'
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
        justifyContent: 'center',
        marginTop: 40
      },
});