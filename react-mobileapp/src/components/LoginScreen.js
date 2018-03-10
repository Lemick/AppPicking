//https://github.com/gcanti/tcomb-form-native

import { ScrollView, TextInput } from "react-native-gesture-handler";
import Container from "./Container";
import Label from "./Label";
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Picker } from 'react-native';
import t from 'tcomb-form-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

import { resetNavigation } from '../NavigationUtils';
import GLOBAL from '../GlobalConst';


export default class Login extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            userSelected: null,
        };
        this.onCBUserChange = this.onCBUserChange.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    componentWillMount() {
        fetch(GLOBAL.API_URL + '/user')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    onCBUserChange(index) {
        if (index > 0) {
            for (var key in this.state.users) {
                let user = this.state.users[key];
                if (user.id == index) {
                    this.setState({ userSelected: user });
                }
            }
        }
    }

    onPress() {
        if (this.state.userSelected) {
            resetNavigation(this, 'Picking', { user: this.state.userSelected });
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.title}> HuitNeufDis </Text>
                <Picker
                    selectedValue={this.state.userSelected == null ? 0 : this.state.userSelected.id}
                    onValueChange={(itemValue) => this.onCBUserChange(itemValue)}>
                    <Picker.Item label='Sélectionner un utilisateur...' value='0' />
                    {
                        this.state.users.map(user =>
                            <Picker.Item label={user.name + ' ' + user.surname} value={user.id} key={user.id} />
                        )
                    }
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
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 60
    },
    buttonText: {
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