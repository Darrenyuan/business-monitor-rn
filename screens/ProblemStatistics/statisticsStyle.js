import { Dimensions } from "react-native";


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default {
  worp: {
    height: SCREEN_HEIGHT
  },
  buttonViem: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  arrStyle: {
    marginLeft: SCREEN_WIDTH * 0.005,
    marginRight: SCREEN_WIDTH * 0.005,
  },
  boxView: {
    width: SCREEN_WIDTH,
    marginTop: SCREEN_HEIGHT * 0.06,
    justifyContent: 'center',
  },
  headText: {
    fontSize: 22,
  },
  headStyle: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
  },
  courseWrap: {
    flexDirection: 'row',
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: SCREEN_HEIGHT * 0.3,
    backgroundColor: "#fff",
  },
  textstyle: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.06,
    backgroundColor: "#25C6FC",
    lineHeight: SCREEN_HEIGHT * 0.06,
    textAlign: "center",
    borderRadius: 50,
    color: "#fff"
  },
  listItem: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_HEIGHT * 0.04,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#A39F93"
  },
  headerNav: {
    flexDirection: 'row',
  },
  navText1: {
    lineHeight: SCREEN_HEIGHT * 0.04,
    textAlign: "center",
    fontSize: 18
  },
  navText: {
    lineHeight: SCREEN_HEIGHT * 0.06,
    textAlign: "center",
    fontSize: 18
  },
  viewList: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_HEIGHT * 0.06,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#A39F93"
  },
  typeText: {
    lineHeight: SCREEN_HEIGHT * 0.06,
    textAlign: "center",
    fontSize: 18,
    color: "blue"
  },
  statusText: {
    lineHeight: SCREEN_HEIGHT * 0.06,
    textAlign: "center",
    fontSize: 18,
    color: "red"
  },
  modalDropdown: {
    width: SCREEN_WIDTH * 0.20,
    backgroundColor: "#2089dc",
    borderRadius: 3,
    marginLeft: SCREEN_WIDTH * 0.005,
    marginRight: SCREEN_WIDTH * 0.005,
  },
  dropdownPosition: {
    width: SCREEN_WIDTH * 0.20,
    textAlign: "center",
    fontSize: 16
  },
  textStyle: {
    color: '#FFF',
    fontSize: 18,
    textAlign: "center",
    lineHeight: SCREEN_HEIGHT * 0.05,
  },
  ItemLists: {
    display: "flex",
    marginTop: SCREEN_HEIGHT * 0.01,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  itemIssue: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#A39F93"
  },
  ratingText: {
    width: SCREEN_WIDTH * 0.2,
    fontSize: 16,
    color: "red",
  },
  ratingText1: {
    width: SCREEN_WIDTH * 0.28,
    fontSize: 16
  },
  ratingText2: {
    width: SCREEN_WIDTH * 0.12,
    fontSize: 16
  },
  ratingText3: {
    width: SCREEN_WIDTH * 0.21,
    fontSize: 16,
    color: "blue",
  },
  customtext: {
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#2089dc",
    marginTop: SCREEN_HEIGHT * 0.005,
    marginBottom: SCREEN_HEIGHT * 0.005,
    paddingTop: SCREEN_HEIGHT * 0.01,
    paddingBottom: SCREEN_HEIGHT * 0.01,
    color: "#fff"
  },
}