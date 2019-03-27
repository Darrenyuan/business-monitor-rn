import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleInput: {
    paddingLeft: 5,
    marginTop: SCREEN_HEIGHT * 0.02,
    textAlign: 'left',
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.06,
    fontSize: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    color: '#aaa',
  },
  inputContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    marginTop: SCREEN_HEIGHT * 0.02,
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.22,
    borderRadius: 3,
  },
  textInput: {
    height: SCREEN_HEIGHT * 0.22,
    textAlignVertical: 'top',
    paddingVertical: 0,
    paddingLeft: SCREEN_WIDTH * 0.02,
    fontSize: 16,
    color: '#aaa',
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picture_upload: {
    height: SCREEN_HEIGHT * 0.07,
    width: SCREEN_WIDTH * 0.47,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    marginTop: SCREEN_HEIGHT * 0.07,
  },
  modalDropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: 3,
    justifyContent: 'center',
    paddingLeft: SCREEN_WIDTH * 0.01,
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  textStyle: {
    color: '#aaa',
    fontSize: 16,
  },
  dropdownStyle: {
    width: SCREEN_WIDTH * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownTextStyle: {
    color: '#aaa',
    fontSize: 16,
  },
  dropdownTextHighlightStyle: {
    color: '#FFCF40',
    fontSize: 18,
  },
  image: {
    height: SCREEN_HEIGHT * 0.24,
    width: SCREEN_WIDTH * 0.95,
    marginTop: SCREEN_HEIGHT * 0.02,
  },
};
