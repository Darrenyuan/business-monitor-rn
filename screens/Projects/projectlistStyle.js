import { Dimensions } from "react-native";


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
export default {
  wrap: {
    height: SCREEN_HEIGHT
  },
  container: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#A39F93"
  },
  buttonViem: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  arrStyle: {
    width: SCREEN_WIDTH * 0.24,
    marginLeft: SCREEN_WIDTH * 0.005,
    marginRight: SCREEN_WIDTH * 0.005,
  },
  arrStyle: {
    width: SCREEN_WIDTH * 0.24,
    marginLeft: SCREEN_WIDTH * 0.005,
    marginRight: SCREEN_WIDTH * 0.005,
  },
  rightbut: {
    marginRight: SCREEN_WIDTH * 0.1,
  },
  leftbut: {
    marginLeft: SCREEN_WIDTH * 0.1,
  }
}

export { SCREEN_WIDTH, SCREEN_HEIGHT }
