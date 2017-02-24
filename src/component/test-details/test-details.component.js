import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Content, H2, Text } from 'native-base';

import SharedStyles from '../../style/shared';

export default class TestDetails extends Component {
  constructor(props) {
    super(props);
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_LEFT:
        this.props.testNext();
        break;
      case SWIPE_RIGHT:
        this.props.testPrevious();
        break;
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    if (!this.props.isComplete) {
      return (
        <GestureRecognizer
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          config={config}
          style={{
            flex: 1
          }}>
          {this.renderDescription()}
          {this.renderName()}
        </GestureRecognizer>
      );
    } else {
      return null;
    }
  }

  renderName() {
    if (!this.props.showDescription) {
      return (
        <Content padder style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={StyleSheet.flatten(SharedStyles.testItemName)}>
            {this.props.currentTest ? this.props.currentTest.name : null}
          </Text>
        </Content>
      );
    } else {
      return null;
    }
  }

  renderDescription() {
    if (this.props.showDescription) {
      return (
        <Content padder style={{ flex: 1, flexDirection: 'column' }}>
          {this.props.currentTest.onReading ? (this.props.currentTest.onReading === '' ? null :
            <View>
              <H2>
                {this.props.currentTest ? this.props.currentTest.onReading : null}
              </H2>
              <View style={[SharedStyles.separator, SharedStyles.mb, SharedStyles.mt]} />
            </View>
          ) : null}
          {this.props.currentTest.kunReading ? (this.props.currentTest.kunReading === '' ? null :
            <View>
              <H2>
                {this.props.currentTest ? this.props.currentTest.kunReading : null}
              </H2>
              <View style={[SharedStyles.separator, SharedStyles.mb, SharedStyles.mt]} />
            </View>
          ) : null}
          {this.props.currentTest.english === '' ? null :
            <View>
              <H2>
                {this.props.currentTest ? this.props.currentTest.english : null}
              </H2>
            </View>
          }
        </Content>
      );
    } else {
      return null;
    }
  }
}
