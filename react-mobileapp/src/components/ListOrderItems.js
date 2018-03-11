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
} from "native-base";

export default class ListOrderItems extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (!this.props.orderItems) {
            return (
                <Container style={styles.container}>
                    <Content>
                        <Text>Pas de picking en cours</Text>
                    </Content>
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
                                        <Text>{orderItem.name}</Text>
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
        backgroundColor: '#fafafa',
    }
});