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
} from "native-base";

export default class Profile extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Container >
                <Grid>
                    <Row size={20} />
                    <Row size={15} >
                        <H3 style={styles.baseMessage} >Informations du profil :</H3>
                    </Row>
                    <Row size={20} />
                    <Row size={45} >
                        <Button danger style={styles.sizedButton} onPress={() => this.props.onPressDisconnect()}>
                            <Icon name="md-power" />
                            <Text>Deconnexion</Text>
                        </Button>
                    </Row>
                </Grid>
            </Container >

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