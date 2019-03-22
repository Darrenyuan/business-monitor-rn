import { Dimensions } from "react-native";


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
export default {
  worp:{
    height: SCREEN_HEIGHT
  },
  container:{
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#A39F93"
  }
}