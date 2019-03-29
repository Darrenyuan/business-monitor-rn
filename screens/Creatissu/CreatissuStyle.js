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
    color: '#000',
<<<<<<< f9b1bbe7d30316249fca0d66488a0e5411d38b5e
=======
    marginBottom: SCREEN_HEIGHT * 0.01,
>>>>>>> bug
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
    color: '#000',
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
    alignItems: 'center',
  },
  textStyle: {
    color: '#000',
    fontSize: 16,
  },
  dropdown_row: {
    paddingLeft: SCREEN_WIDTH * 0.08,
    paddingRight: SCREEN_WIDTH * 0.08,
    height: SCREEN_HEIGHT * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown_row_text: {
    color: '#aaa',
    fontSize: 16,
  },
  image: {
    height: SCREEN_HEIGHT * 0.24,
    width: SCREEN_WIDTH * 0.95,
    marginTop: SCREEN_HEIGHT * 0.02,
  },
};
