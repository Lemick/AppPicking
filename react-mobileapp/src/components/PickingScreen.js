
import { ScrollView, TextInput } from "react-native-gesture-handler";
import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";

import { resetNavigation } from '../NavigationUtils';
import Constants from '../GlobalConst';
import Footer from './Footer';
import Profile from './Profile';
import ScanSuccess from './ScanSuccess';
import ListOrderItems from './ListOrderItems';

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
    Badge,
    Spinner,
} from "native-base";


export default class PickingScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.title) === 'undefined' ? 'Picking' : navigation.state.params.title,
        headerLeft: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.navigation.state.params.user,
            pickingLoading: true,
            picking: null,
            currentOrderItem: null,
            activeTab: Constants.TabEnum.Picking,
            scanSuccess: false,
            dots: '',
        }

        // Binding
        this.disconnect = this.disconnect.bind(this);
        this.tick = this.tick.bind(this);
        this.showProfile = this.showProfile.bind(this);
        this.showPicking = this.showPicking.bind(this);
        this.showListing = this.showListing.bind(this);
        this.setNextItemOrder = this.setNextItemOrder.bind(this);
    }

    componentWillMount() {
        fetch(Constants.API_URL + '/user/' + this.state.user.id + '/picking/')
            .then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .then(picking => {
                // Si picking en cours on va chercher la liste des produits de la commande
                if (Object.keys(picking).length !== 0) {
                    fetch(Constants.API_URL + '/picking/' + picking.id + '/orderitems/')
                        .then((res) => res.text())
                        .then((text) => text.length ? JSON.parse(text) : {})
                        .then(orderitems => {
                            picking['items'] = orderitems;
                            this.setState({ picking }, () => {
                                this.setNextItemOrder();
                                this.timerDots = setInterval(this.tick, 1000);
                                this.setPickingLoading(false);
                            })
                        }).catch((error) => console.log(error));

                } else {
                    this.setPickingLoading(false);
                }
            }).catch((error) => console.log(error));
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        if (this.timerDots)
            clearInterval(this.timerDots);
    }

    setNextItemOrder() {
        let orderItems = this.state.picking['items'];
        console.log(orderItems);
        for (var i = 0; i < orderItems.length; i++) {
            if (orderItems[i].quantityPicked < orderItems[i].quantity) {
                this.setState({
                    currentOrderItem: orderItems[i],
                    scanSuccess: false
                });
            }
        }
    }

    setPickingLoading(value) {
        this.setState({ pickingLoading: value })
    }

    tick() {
        var newDots = this.state.dots.length > 2 ? '' : this.state.dots + '.';
        this.setState({ dots: newDots });
    }

    disconnect() {
        resetNavigation(this, 'Login');
    }

    showProfile() {
        this.props.navigation.setParams({ title: 'Profil' })
        this.setState({ activeTab: Constants.TabEnum.Profile });
    }

    showPicking() {
        this.props.navigation.setParams({ title: 'Picking' })
        this.setState({ activeTab: Constants.TabEnum.Picking });
    }

    showListing() {
        this.props.navigation.setParams({ title: 'Liste de sous-commandes' })
        this.setState({ activeTab: Constants.TabEnum.Listing });
    }

    /****************
    *   RENDER
    ****************/
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
                    <Profile onPressDisconnect={this.disconnect} user={this.state.user} />
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
                    <ListOrderItems orderItems={this.state.picking && this.state.picking['items']} />
                    <_Footer />
                </Container >
            )
        }

        /**
         * Recherche/Generation du picking
         */
        if (this.state.pickingLoading) {
            return (
                <Container>
                    <Spinner />
                </Container>
            );
        }

        /**
         * Ecran affiché aprés le scan NFC
         */
        if (this.state.scanSuccess == true) {
            return (
                <Container>
                    <ScanSuccess item={this.state.currentOrderItem} goToNextArticle={this.setNextItemOrder} />
                    <_Footer />
                </Container >
            );
        }



        /**
         * Interface d'affichage du picking en cours
         */
        if (this.state.currentOrderItem) {
            const item = this.state.currentOrderItem;
            return (
                <Container>
                    <Grid>
                        <Row size={5} />
                        <Row size={70}>
                            <Card style={styles.item}>
                                <CardItem header>
                                    <Text>{item.name} (ID {item.idProduct})</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={{ fontSize: 20 }}>Etage 2</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={{ fontSize: 20 }}>Alley 3</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={{ fontSize: 20 }}>Etagére 9</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={{ fontSize: 20 }}>Block 3</Text>
                                </CardItem>
                            </Card>
                        </Row>

                        <Row size={5} />
                        <Row size={20}>
                            <Button outline info style={styles.waitingButton} onPress={() => this.setState({ scanSuccess: true })}>
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