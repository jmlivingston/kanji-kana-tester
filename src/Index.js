import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Body, Button, Container, Content, H3, Header, Icon, Left, Right, Text, Title } from 'native-base';

import { ActionTypes } from './reducer/action-types.model';
import indexStore from './reducer/index.store';
import StartTest from './component/start-test/start-test.component';
import TestButtons from './component/test-buttons/test-buttons.component';
import TestDetails from './component/test-details/test-details.component';
import SharedStyles from './style/shared';

export default class KanjiKanaTester extends Component {
  constructor(props) {
    super(props);
    this.bindMethods();
    this.state = indexStore.getState();
    indexStore.subscribe(() => {
      let nextState = indexStore.getState();
      this.setState(nextState);
    });
  }

  // Methods
  bindMethods() {
    this.checkTest = this.checkTest.bind(this);
    this.incrementTest = this.incrementTest.bind(this);
    this.navigateHome = this.navigateHome.bind(this);
    this.reviewTestAgain = this.reviewTestAgain.bind(this);
    this.startTest = this.startTest.bind(this);
    this.testNext = this.testNext.bind(this);
    this.testPrevious = this.testPrevious.bind(this);
    this.testSizeChanged = this.testSizeChanged.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  checkTest(isChecked) {
    indexStore.dispatch({
      type: ActionTypes.checkTest,
      isChecked: isChecked
    });
  }

  incrementTest(incrementer) {
    indexStore.dispatch({
      type: ActionTypes.incrementTest,
      incrementer: incrementer
    });
  }

  navigateHome() {
    indexStore.dispatch({
      type: ActionTypes.navigateHome
    });
  }

  reviewTestAgain() {
    indexStore.dispatch({
      type: ActionTypes.reviewTestAgain
    });
  }

  startTest(splitItem) {
    indexStore.dispatch({
      type: ActionTypes.startTest,
      splitItem: splitItem
    });
  }

  testNext() {
    indexStore.dispatch({
      type: ActionTypes.testNext
    });
  }

  testPrevious() {
    indexStore.dispatch({
      type: ActionTypes.testPrevious
    });
  }

  testSizeChanged(size) {
    indexStore.dispatch({
      type: ActionTypes.testSizeChanged,
      size: size
    });
  }

  toggleDescription() {
    indexStore.dispatch({
      type: ActionTypes.toggleDescription
    });
  }

  updateDescription(description) {
    indexStore.dispatch({
      type: ActionTypes.updateDescription,
      description: description
    });
  }

  // Views
  renderBack() {
    if (!this.state.isShowList) {
      return (<Left>
        <Button transparent onPress={this.navigateHome}>
          <Icon name="arrow-back" />
        </Button>
      </Left>);
    } else {
      return null;
    }
  }

  renderTestDetails(item) {
    return (<TestDetails
      currentItem={item}
    />);
  }

  renderViewPager() {
    if (!this.state.isComplete && !this.state.isShowList) {
      return (
        <TestDetails
          currentTest={this.state.currentTest}
          isComplete={this.state.isComplete}
          navigateHome={this.navigateHome}
          reviewTestAgain={this.reviewTestAgain}
          showDescription={this.state.showDescription}
          testNext={this.testNext}
          testPrevious={this.testPrevious}
          toggleDescription={this.toggleDescription}
        />
      );
    } else {
      if (this.state.isComplete) {
        return (
          <Content padder>
            <H3 style={StyleSheet.flatten(SharedStyles.mb)}>Complete</H3>
            <Button primary block onPress={this.navigateHome} style={StyleSheet.flatten(SharedStyles.mb)}><Text>Home</Text></Button>
            <Button primary block onPress={this.reviewTestAgain}><Text>Review Again</Text></Button>
          </Content>
        );
      } else {
        return null;
      }
    }
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <Header>
          {this.renderBack()}
          <Body>
            <Title>Kanji Kana Tester</Title>
          </Body>
          <Right />
        </Header>
        <StartTest
          isShowList={this.state.isShowList}
          hiraganaSplit={this.state.hiraganaSplit}
          katakanaSplit={this.state.katakanaSplit}
          joyoKanjiSplit={this.state.joyoKanjiSplit}
          showDescription={this.state.showDescription}
          size={this.state.size}
          startTest={this.startTest}
          testSizeChanged={this.testSizeChanged}
          updateDescription={this.updateDescription}
        />
        {this.renderViewPager()}
        <TestButtons
          checkTest={this.checkTest}
          isComplete={this.state.isComplete}
          isShowList={this.state.isShowList}
          testNext={this.testNext}
          testPrevious={this.testPrevious}
          toggleDescription={this.toggleDescription}
        />
      </Container>
    );
  }
}
