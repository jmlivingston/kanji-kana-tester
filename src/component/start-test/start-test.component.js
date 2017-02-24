import React, { Component } from 'react';
import { ScrollView, Switch, View } from 'react-native';

import { Content, H3, Item, List, ListItem, Picker, Text } from 'native-base';

import SharedStyles from '../../style/shared';

export default class StartTest extends Component {
  constructor(props) {
    super(props);
  }

  getListItemText(splitList, splitItem, i) {
    let text = splitItem.items[0].name + ' ';
    text += splitItem.items[splitItem.items.length - 1].name;
    text += ' (';
    text += ((this.props.size * i) + 1);
    text += '-';
    if (splitList.length === 1) {
      text += splitItem.items.length;
    } else {
      text += (((this.props.size * i)) + this.props.size) - (this.props.size - splitItem.items.length);
    }
    text += ')';
    return text;
  }

  render() {
    if (this.props.isShowList) {
      return (
        <ScrollView>
          <Content padder>
            <View>
              <H3>Toggle Description</H3>
              <Switch
                onValueChange={(description) => this.props.updateDescription(description)}
                value={this.props.showDescription} />
            </View>
            <View style={[SharedStyles.separator, SharedStyles.mb, SharedStyles.mt]} />
            <H3>Test Size</H3>
            <Picker
              iosHeader="Select Test Size"
              mode="dropdown"
              selectedValue={this.props.size}
              onValueChange={(size) => this.props.testSizeChanged(size)}>
              <Item label="5" value={5} />
              <Item label="10" value={10} />
              <Item label="25" value={25} />
              <Item label="50" value={50} />
              <Item label="100" value={100} />
            </Picker>
            <View style={[SharedStyles.separator, SharedStyles.mb, SharedStyles.mt]} />
            <H3>Select Test</H3>
          </Content>
          <ListItem itemDivider>
            <Text>
              Hiragana　平仮名
              </Text>
          </ListItem>
          <List dataArray={this.props.hiraganaSplit} renderRow={(splitItem, sec, i) =>
            <ListItem onPress={() => this.props.startTest(splitItem)}>
              <Text backgroundColor="red">{this.getListItemText(this.props.hiraganaSplit, splitItem, i)}</Text>
            </ListItem>
          } />
          <View style={[SharedStyles.mt]}>
            <ListItem itemDivider>
              <Text>
                Katakana 片仮名
              </Text>
            </ListItem>
            <List dataArray={this.props.katakanaSplit} renderRow={(splitItem, sec, i) =>
              <ListItem onPress={() => this.props.startTest(splitItem)}>
                <Text>{this.getListItemText(this.props.katakanaSplit, splitItem, i)}</Text>
              </ListItem>
            } />
          </View>
          <View style={[SharedStyles.mt]}>
            <ListItem itemDivider>
              <Text>
                Kanji　漢字
              </Text>
            </ListItem>
            <List dataArray={this.props.joyoKanjiSplit} renderRow={(splitItem, sec, i) =>
              <ListItem onPress={() => this.props.startTest(splitItem)}>
                <Text>{this.getListItemText(this.props.joyoKanjiSplit, splitItem, i)}</Text>
              </ListItem>
            } />
          </View>
        </ScrollView>
      );
    } else {
      return null;
    }
  }
}
