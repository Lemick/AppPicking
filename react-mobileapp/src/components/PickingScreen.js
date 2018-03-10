
import { ScrollView, TextInput } from "react-native-gesture-handler";
import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";

import Label from "./Label";
import { resetNavigation } from '../NavigationUtils';
import Constants from '../GlobalConst';
import Footer from './Footer';
import Profile from './Profile';

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
            activeTab: Constants.TabEnum.Picking,
            dots: '',
        }

        // Binding
        this.disconnect = this.disconnect.bind(this);
        this.tick = this.tick.bind(this);
        this.showProfile = this.showProfile.bind(this);
        this.showPicking = this.showPicking.bind(this);
        this.showListing = this.showListing.bind(this);
    }

    componentWillMount() {
        console.log(this.state.user);
        fetch(Constants.API_URL + '/user/' + this.state.user.id + '/picking/')
            .then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .then(picking => {
                // Si picking en cours on va chercher la liste des produits de la commande
                if (picking) {
                    fetch(Constants.API_URL + '/picking/' + picking.id + '/orderitems/')
                        .then((res) => res.text())
                        .then((text) => text.length ? JSON.parse(text) : {})
                        .then(orderitems => {
                            picking['items'] = orderitems;
                            console.log(picking);
                            this.setState({ picking }, () => {
                                this.timerDots = setInterval(this.tick, 1000);
                            })
                        }).catch((error) => console.log(error));

                }
            }).catch((error) => console.log(error));
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        if (this.timerDots)
            clearInterval(this.timerDots);
    }

    tick() {
        var newDots = this.state.dots.length > 2 ? '' : this.state.dots + '.';
        this.setState({ dots: newDots });
    }

    disconnect() {
        resetNavigation(this, 'Login');
    }

    showProfile() {
        this.setState({ activeTab: Constants.TabEnum.Profile });
    }

    showPicking() {
        this.setState({ activeTab: Constants.TabEnum.Picking });
    }

    showListing() {
        this.setState({ activeTab: Constants.TabEnum.Listing });
    }

    render() {
        const { navigate } = this.props.navigation;
        const _Footer = () => {
            return (
                <Footer showProfile={this.showProfile} showListing={this.showListing} showPicking={this.showPicking} activeTab={this.state.activeTab} />
            );
        }

        /**
         * Affichage du profil
         */
        if (this.state.activeTab == Constants.TabEnum.Profile) {
            return (
                <Container>
                    <Profile onPressDisconnect={this.disconnect} />
                    <_Footer />

                </Container >
            )
        }

        /**
         * Affichage de la liste des produits du picking en cours
         */
        if (this.state.activeTab == Constants.TabEnum.Listing) {
            return (
                <Container>
                    <Text>liste produits</Text>
                    <Row />
                    <_Footer />
                </Container >
            )
        }


        /**
         * Interface d'affichage du picking en cours
         */
        if (this.state.picking) {
            return (
                <Container>
                    <Grid>
                        <Row size={5} />
                        <Row size={55}>
                            <Card style={styles.item}>
                                <CardItem header>
                                    <Text>ID</Text>
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
                                <Text>En attente du scan du produit via NFC{this.state.dots}</Text>
                            </Button>
                        </Row>
                    </Grid>

                    <_Footer />
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
                <_Footer />
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