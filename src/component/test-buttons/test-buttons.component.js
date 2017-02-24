import React, { Component } from 'react';

import { Button, Icon, Footer, FooterTab, Text } from 'native-base';

import ItemService from '../../index.service';

export default class TestButtons extends Component {
    itemService = new ItemService();
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.isShowList && !this.props.isComplete) {
            return (
                <Footer >
                    <FooterTab>
                        <Button onPress={this.props.testPrevious}>
                            <Icon name="arrow-back" />
                            <Text>Prev</Text>
                        </Button>
                        <Button onPress={this.props.testNext}>
                            <Icon name="arrow-forward" />
                            <Text>Next</Text>
                        </Button>
                        <Button onPress={this.props.toggleDescription}>
                            <Icon name="repeat" />
                            <Text>Flip</Text>
                        </Button>
                        <Button onPress={() => this.props.checkTest(true)}>
                            <Icon name="checkmark" />
                            <Text>Check</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        } else {
            return null;
        }
    }
}
