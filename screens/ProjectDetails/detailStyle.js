import { Dimensions } from "react-native";


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const fontSzie = Dimensions.get("window").fontSize;
export default {
  worp: {
    flex: 1,
    height: SCREEN_HEIGHT
  },
  detailView: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    height: SCREEN_HEIGHT * 0.06,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#A39F93",
  },
  detailText: {
    width: SCREEN_WIDTH * 0.3,
    height: "100%",
    marginRight: 2,
    fontSize: 16,
    lineHeight: SCREEN_HEIGHT * 0.06,
    textAlign: "center",
    borderRightWidth: 1,
    borderStyle: "solid",
    borderRightColor: "#A39F93",
  },
  detailColor: {
    width: SCREEN_WIDTH * 0.6,
    height: "100%",
    fontSize: 16,
    lineHeight: SCREEN_HEIGHT * 0.06,
    textAlign: "center"
  }
}