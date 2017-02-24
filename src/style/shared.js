import { Dimensions, StyleSheet } from 'react-native';

const SharedStyles = StyleSheet.create({
  mt: {
    marginTop: 10
  },
  mb: {
    marginBottom: 10
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc'
  },
  signature: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 350,
    backgroundColor: '#ccc'
  },
  testItemName: {
    fontSize: 260,
    textAlign: 'center'
  },
  textLeft: {
    alignSelf: 'flex-start',
  },
  textRight: {
    alignSelf: 'flex-end',
  },
  button: {
    marginBottom: 3
  },
  testButtons: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20
  },
  testButtonColLeft: {
    paddingRight: 3
  },
  testButtonColRight: {
    paddingLeft: 3
  },
  testButtonColInner: {
    paddingRight: 3,
    paddingLeft: 3
  },
  testButtonRow: {
    height: 50
  }
});

export default SharedStyles;
