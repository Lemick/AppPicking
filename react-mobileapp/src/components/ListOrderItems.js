import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Modal from "react-native-modal";

import GLOBAL from '../GlobalConst';

import {
    Container,
    Text,
    Icon,
    List,
    ListItem,
    Content,
    Body,
    Right,
    H5,
} from "native-base";

export default class ListOrderItems extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (!this.props.orderItems) {
            return (
                <Container style={styles.container}>
                        <Text style={styles.textEmpty}>Pas de picking en cours...</Text>
                </Container>
            );
        }

        return (
            <Container style={styles.container}>
                <Content>
                    <List>
                        {
                            this.props.orderItems.map(orderItem =>
                                <ListItem key={orderItem.orderitemId}>
                                    <Body>
                                        <Text>{orderItem.idProduct} {orderItem.name}</Text>
                                        <Text note>Quantité : x{orderItem.quantity}</Text>
                                    </Body>
                                    <Right>
                                        {
                                            (orderItem.quantity == orderItem.quantityPicked)
                                                ? <Icon name="md-checkbox" style={{ color: 'green' }} />
                                                : <Icon name="md-square" />
                                        }
                                    </Right>
                                </ListItem>
                            )
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F5F7',
    },
    textEmpty: {
        textAlign: 'center',
        paddingTop: 40,
    },
});