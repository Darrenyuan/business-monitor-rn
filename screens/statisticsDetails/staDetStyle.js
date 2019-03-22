import { Dimensions } from "react-native";


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const fsc = SCREEN_HEIGHT - 180
export default {
  worp: {
    height: SCREEN_HEIGHT
  },
  viewWorp: {
    width: "100%",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#A39F93",
  },
  viewWorps: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#A39F93",
  },
  butViewStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SCREEN_HEIGHT * 0.03,
  },
  butStyle: {
    width: SCREEN_WIDTH * 0.3,
    marginRight: SCREEN_WIDTH * 0.06,
    marginLeft: SCREEN_WIDTH * 0.06,
    marginBottom: SCREEN_WIDTH * 0.06,
  },
  contenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  henderView: {
    height: SCREEN_HEIGHT * 0.04
  },
  henderText: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: SCREEN_HEIGHT * 0.07,
    textAlign: "center",
  },
  imgStyle: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.3,
    marginTop: SCREEN_HEIGHT * 0.01,
    borderWidth: 1,
  },
  textStyle: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT * 0.2,
    marginTop: SCREEN_HEIGHT * 0.02,
    borderWidth: 1,
  },
  issueStyle: {
    position: "relative",
    left: -SCREEN_WIDTH * 0.23,
  },
  modulStyle: {
    marginTop: fsc * 0.3,
    marginBottom: fsc * 0.1,
  },
  OpinionStyle: {
    width: SCREEN_WIDTH * 0.8,
    lineHeight: 18,
    color: "red",
  },
  OpinStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 7,
    width: 90,
    height: 90,
    marginRight: 20,
  },
}