import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    marginTop: SCREEN_HEIGHT * 0.04,
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.28,
    borderRadius: 6,
  },
  textInput: {
    textAlignVertical: 'top',
    paddingVertical: 0,
    paddingLeft: SCREEN_WIDTH * 0.01,
    fontSize: 18,
    height: SCREEN_HEIGHT * 0.28,
  },
  imgContainer: {
    marginTop: SCREEN_HEIGHT * 0.08,
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.2,
    flexDirection: 'row',
  },
  img: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    marginTop: SCREEN_HEIGHT * 0.025,
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.15,
    marginRight: SCREEN_WIDTH * 0.02,
  },
  picture_upload: {
    height: SCREEN_HEIGHT * 0.07,
    width: SCREEN_WIDTH * 0.28,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    marginTop: SCREEN_HEIGHT * 0.07,
  },
  submit: {
    fontSize: 30,
    height: SCREEN_HEIGHT * 0.075,
    width: SCREEN_WIDTH * 0.95,
    borderColor: 'white',
    borderRadius: 30,
    marginTop: SCREEN_HEIGHT * 0.14,
    // bottom: 0,
  },
};
