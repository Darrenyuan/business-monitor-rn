import { Dimensions } from 'react-native';
import { Colors } from '../../constants';

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const SCREEN_HEIGHT = Dimensions.get("window").height;

export default {
  container: {
    flex: 1,
  },
  titleInput: {
    paddingLeft: 5,
    marginTop: 120,
    marginLeft: 20,
    textAlign: 'left',
    height: 40,
    width: 320,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // paddingVertical: 0,
    fontSize: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
  },
  inputContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    marginTop: 10,
    width: 320,
    marginLeft: 20,
    height: 105,
    borderRadius: 6,
  },
  textInput: {
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 105,
    paddingVertical: 0,
    paddingLeft: 5,
    fontSize: 16,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imgContainer: {
    marginTop: 10,
    width: 320,
    marginLeft: 20,
    height: 105,
    flexDirection: 'row',
  },
  img: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 7,
    width: 90,
    height: 90,
    marginRight: 20,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
  modalDropdownContainer: {
    marginTop: 30,
    width: 320,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalDropdown: {
    backgroundColor: '#40AFFF',
    width: 130,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
  },
  dropdownStyle: {
    // flex:1,
    // width: 130,
    // borderRadius: 4,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "red",
    // marginRight:30
  },
};
