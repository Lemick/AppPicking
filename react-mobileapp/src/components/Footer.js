import React, { Component } from 'react';
import {
    Text,
    Button,
    Footer,
    FooterTab,
    Icon,
} from "native-base";
import { StackNavigator, NavigationActions } from 'react-navigation';

export default class CustomFooter extends Component {

    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button >
                        <Icon name="md-power" />
                        <Text>Lorem</Text>
                    </Button>
                    <Button onPress={() => this.props.onPressDisconnect()}>
                        <Icon name="md-power" />
                        <Text>Deconnexion</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}
