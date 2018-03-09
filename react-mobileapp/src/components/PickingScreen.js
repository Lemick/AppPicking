
import { ScrollView, TextInput } from "react-native-gesture-handler";
import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";

import Label from "./Label";
import { resetNavigation } from '../NavigationUtils';
import GLOBAL from '../GlobalConst';
import Footer from './Footer';

import {
    Container,
    Title,
    Text,
    Button,
    Body,
    Icon,
    H3,
    Card,
    CardItem,

} from "native-base";



export default class PickingScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.user.name + ' ' + navigation.state.params.user.surname,
        headerLeft: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.navigation.state.params.user,
            picking: null,
            dots: '',
        }

        this.disconnect = this.disconnect.bind(this);
        this.tick = this.tick.bind(this);

    }

    componentWillMount() {
        console.log(this.state.user);
        fetch(GLOBAL.API_URL + '/user/' + this.state.user.id + '/picking/')
            .then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .then(picking => {
                if (picking && picking.length > 0) {
                    this.setState({ picking });
                }
            }).catch((error) => console.log(error));
    }

    componentDidMount() {
        this.timerDots = setInterval(this.tick, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerDots);
    }

    tick() {
        var newDots = this.state.dots.length > 2 ? '' : this.state.dots + '.';
        this.setState({ dots: newDots });
    }

    disconnect() {
        resetNavigation(this, 'Login');
    }

    render() {
        const { navigate } = this.props.navigation;

        /**
         * Affichage du picking en cours
         */
        if (this.state.picking != null) {
            return (
                <Container>

                    <Grid>
                        <Row size={5} />

                        <Row size={55}>
                            <Card style={styles.item}>
                                <CardItem header>
                                    <Text>NativeBase</Text>
                                </CardItem>
                                <CardItem>
                                    <Text>
                                        NativeBase is a free and open source framework that enables developers to build
                                        high-quality mobile apps using React Native iOS and Android apps
                                        with a fusion of ES6.
                                    </Text>
                                </CardItem>
                            </Card>
                        </Row>

                        <Row size={5} />
                        <Row size={35}>
                            <Button outline primary style={styles.waitingButton}>
                                <Text>En attente de scan du produit via NFC{this.state.dots}</Text>
                            </Button>
                        </Row>
                    </Grid>

                    <Footer onPressDisconnect={this.disconnect} />
                </Container >
            );
        }


        /**
        * Pas de picking, on propose à l'utilisateur d'en demarrer un
        */
        return (
            <Container>
                <Body>
                    <Grid>
                        <Row size={20} />
                        <Row size={15} >
                            <H3 style={styles.baseMessage} >Vous n'avez pas de picking en cours</H3>
                        </Row>
                        <Row size={20} />
                        <Row size={45} >
                            <Button primary style={styles.sizedButton}>
                                <Text>Démarrer un picking</Text>
                            </Button>
                        </Row>
                    </Grid>

                </Body>
                <Footer onPressDisconnect={this.disconnect} />
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    baseMessage: {
        justifyContent: 'center',
    },
    sizedButton: {
        flex: 1,
        justifyContent: 'center',
        height: 75,
    },
    waitingButton: {
        flex: 1,
    },
});