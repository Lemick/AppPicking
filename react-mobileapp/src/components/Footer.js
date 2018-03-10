import React, { Component } from 'react';
import {
    Text,
    Button,
    Footer,
    FooterTab,
    Icon,
} from "native-base";
import { StackNavigator, NavigationActions } from 'react-navigation';

import Constants from '../GlobalConst';

export default class CustomFooter extends Component {

    constructor(props) {
        super(props);

        this.togglePicking = this.togglePicking.bind(this);
        this.toggleListing = this.toggleListing.bind(this);
        this.toggleProfile = this.toggleProfile.bind(this);
    }

    togglePicking() {
        if (this.props.showPicking) {
            this.props.showPicking();
        }
    }

    toggleListing() {
        if (this.props.showListing) {
            this.props.showListing();
        }
    }

    toggleProfile() {
        if (this.props.showProfile) {
            this.props.showProfile();
        }

    }

    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button active={this.props.activeTab == Constants.TabEnum.Picking} onPress={() => this.togglePicking()} >
                        <Icon active={this.props.activeTab == Constants.TabEnum.Picking} name="md-home" />
                        <Text>Picking</Text>
                    </Button>
                    <Button active={this.props.activeTab == Constants.TabEnum.Listing} onPress={() => this.toggleListing()} >
                        <Icon active={this.props.activeTab == Constants.TabEnum.Listing} name="md-list" />
                        <Text>Listing</Text>
                    </Button>
                    <Button active={this.props.activeTab == Constants.TabEnum.Profile} onPress={() => this.toggleProfile()} >
                        <Icon active={this.props.activeTab == Constants.TabEnum.Profile} name="md-person" />
                        <Text>Profil</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}
