import { Dimensions } from 'react-native';
import { Colors } from '../../constants';

export default {
  container: {
    flex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    marginTop: 140,
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
  textStyle: {
    color: 'white',
    fontSize: 18,
  },
};
