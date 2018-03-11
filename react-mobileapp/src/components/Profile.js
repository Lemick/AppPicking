import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import GLOBAL from '../GlobalConst';

import {
    Container,
    Text,
    Button,
    Footer,
    FooterTab,
    Icon,
    H3,
    Body,
} from "native-base";

export default class Profile extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        if (this.props.user) {
            return (
                <Container style={styles.container}>
                        <Grid>
                            <Row size={10} />
                            <Text>Nom : {this.props.user.surname}</Text>
                            <Text>Prenom : {this.props.user.name}</Text>
                            <Row size={20} />
                            <Row size={45} >
                                <Button danger style={styles.sizedButton} onPress={() => this.props.onPressDisconnect()}>
                                    <Icon name="md-power" />
                                    <Text>Se déconnecter</Text>
                                </Button>
                            </Row>
                        </Grid>
                </Container >
            );
        } else {
            return (
                <Container style={styles.container}>
                    <Body>
                        <Text>Erreur récupération profil, veuillez contacter votre administrateur</Text>
                    </Body>
                </Container >
            );
        }
    }
}


const styles = StyleSheet.create({
    sizedButton: {
        flex: 1,
        justifyContent: 'center',
        height: 75,
    },
    container: {
      padding : 20,
    },
});