import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Modal from "react-native-modal";

import GLOBAL from '../GlobalConst';

import {
    Container,
    Text,
    Body,
    Button,
    Icon,
    H3,
    H5,
    Input,
    Item,
    Form,
} from "native-base";

export default class ScanSuccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quantityPicked: this.props.item.quantity.toString(),
            nextDisabled: false,
            modalAlert: false,
            alertSended: false,
        }

        // Bind
        this.onChangedQuantity = this.onChangedQuantity.bind(this);
    }

    onChangedQuantity(text) {
        if (text == '') {
            this.setState({
                nextDisabled: true,
                quantityPicked: '',
            });
        } else {
            let value = Number(text);
            if (value && value >= 0 && value <= this.props.item.quantity) {
                this.setState({
                    quantityPicked: value.toString(),
                    nextDisabled: false,
                });
            }
        }
    }

    sendAlert() {
        // Ecrire en DB L'alerte
        if (true) {
            this.setState({
                modalAlert: true,
                alertSended: true
            });
        }
    }

    saveQuantityPickedInDB() {
        // Ecrire en DB la nouvelle quantité
        this.props.item.quantityPicked = this.props.item.quantity;
        this.props.goToNextArticle();
    }

    render() {
        let disabledNext = this.state.nextDisabled ? { 'disabled': true } : {};
        let disabledAlert = this.state.alertSended ? { 'disabled': true } : { 'danger': true };
        return (
            <Container >
                <Grid>
                    <Col size={5} />
                    <View >
                        <Modal isVisible={this.state.modalAlert && this.state.alertSended}>
                            <View style={styles.modalContent}>
                                <Text>Alerte envoyée</Text>
                                <Button primary style={styles.modalButton} onPress={() => this.setState({ modalAlert: false })}>
                                    <Text>OK</Text>
                                </Button>
                            </View>
                        </Modal>
                    </View>
                    <Col size={90}>
                        <Row size={5} />
                        <Row size={10} >
                            <H3 style={styles.baseMessage}>Produit scanné</H3>
                        </Row>
                        <Row size={5} >
                            { /** Début d'implémentation du picking partiel (si il ne reste que 2 produits en stocks et que la commande en demande 3, permet d'enregistrer le nombre manquant)
                            <Form>
                                <Text>Quantité (la quantité commandée est {this.props.item.quantity}) </Text>
                                <Item rounded >
                                    <Input value={this.state.quantityPicked}
                                        onChangeText={(text) => this.onChangedQuantity(text)}
                                        keyboardType='numeric' maxLength={3} />
                                </Item>
                            </Form>
                            **/}
                        </Row>
                        <Row size={20} />
                        <Row size={20} >
                            <Button {...disabledNext} style={styles.sizedButton} onPress={() => this.saveQuantityPickedInDB()}>
                                <Icon name="md-return-right" />
                                <Text>Article suivant</Text>
                            </Button>
                        </Row>
                        <Row size={20} >
                            <Button {...disabledAlert} style={styles.sizedButton} onPress={() => this.sendAlert()}>
                                <Icon name="md-alert" />
                                <Text>Envoyer une alerte</Text>
                            </Button>
                        </Row>
                    </Col>

                    <Col size={5} />
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
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalButton: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});