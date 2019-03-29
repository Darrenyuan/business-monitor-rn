import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mineItemContainer: {
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  mineItem: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH * 0.95,
    flexDirection: 'row',
    height: SCREEN_HEIGHT * 0.09,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  mineItem_left: {
    fontSize: 20,
    flex: 3,

    textAlign: 'left',
    lineHeight: SCREEN_HEIGHT * 0.09,
  },
  mineItem_right: {
    fontSize: 20,
    flex: 7,
    color: '#bbb',
    textAlign: 'right',
    paddingRight: SCREEN_WIDTH * 0.01,
    lineHeight: SCREEN_HEIGHT * 0.09,
  },
  submit: {
    height: SCREEN_HEIGHT * 0.07,
    width: SCREEN_WIDTH * 0.95,
    backgroundColor: 'red',
    borderRadius: 6,
    marginTop: SCREEN_HEIGHT * 0.05,
  },
};
