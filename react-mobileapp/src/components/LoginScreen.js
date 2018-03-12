import { ScrollView, TextInput } from "react-native-gesture-handler";
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Picker } from 'react-native';
import t from 'tcomb-form-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

import { resetNavigation } from '../NavigationUtils';
import GLOBAL from '../GlobalConst';

import {
    Button,
    Content,
    Spinner,
    Container,
} from "native-base";


export default class Login extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            userSelected: null,
            loading: true,
        };
        this.onCBUserChange = this.onCBUserChange.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    componentWillMount() {
        fetch(GLOBAL.API_URL + '/user')
            .then(res => res.json())
            .then(users => this.setState({
                users,
                loading: false
            }));
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

        if (this.state.loading) {
            return (
                <Container>
                    <Spinner />
                </Container>
            );
        }


        return (

            <View style={styles.container}>
                <Text style={styles.title}> HuitNeufDis </Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.state.userSelected == null ? 0 : this.state.userSelected.id}
                        onValueChange={(itemValue) => this.onCBUserChange(itemValue)}>
                        <Picker.Item
                            label='Sélectionner un utilisateur...' value='0' />
                        {
                            this.state.users.map(user =>
                                <Picker.Item label={user.name + ' ' + user.surname} value={user.id} key={user.id} />
                            )
                        }
                    </Picker>
                </View>
                <Content padder />

                <Button onPress={this.onPress} block underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Se Connecter</Text>
                </Button>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F4F5F7',
        flex: 1,
    },
    title: {
        marginTop : 30,
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 60
    },
    buttonText: {
        marginBottom: 110
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    picker: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
    }
});