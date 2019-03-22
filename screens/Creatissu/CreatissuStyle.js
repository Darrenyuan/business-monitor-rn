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
    marginTop: SCREEN_HEIGHT * 0.04,
    textAlign: 'left',
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.06,
    fontSize: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
  },
  inputContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    marginTop: SCREEN_HEIGHT * 0.02,
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.16,
    borderRadius: 6,
  },
  textInput: {
    textAlignVertical: 'top',
    paddingVertical: 0,
    paddingLeft: SCREEN_WIDTH * 0.01,
    height: SCREEN_HEIGHT * 0.16,
    fontSize: 16,
  },
  imgContainer: {
    marginTop: SCREEN_HEIGHT * 0.04,
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.2,
    flexDirection: 'row',
  },
  img: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: SCREEN_HEIGHT * 0.025,
    width: SCREEN_WIDTH * 0.26,
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
  modalDropdownContainer: {
    marginTop: SCREEN_HEIGHT * 0.04,
    width: SCREEN_WIDTH * 0.85,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalDropdown: {
    backgroundColor: '#40AFFF',
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.14,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
  },
  dropdownStyle: {},
  submit: {
    height: SCREEN_HEIGHT * 0.08,
    width: SCREEN_WIDTH * 0.85,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    marginTop: SCREEN_HEIGHT * 0.08,
  },
};
