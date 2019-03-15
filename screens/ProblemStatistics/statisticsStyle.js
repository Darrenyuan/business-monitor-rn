import { Dimensions } from "react-native";


const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default {
  worp:{
    height: SCREEN_HEIGHT
  },
  buttonViem:{
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  arrStyle:{
    width:SCREEN_WIDTH * 0.24 ,
    marginLeft: SCREEN_WIDTH * 0.005,
    marginRight: SCREEN_WIDTH * 0.005,
  },
  boxView:{
    width:SCREEN_WIDTH,
    marginTop:SCREEN_HEIGHT * 0.06 ,
    justifyContent:'center',
  },
  headText:{
    fontSize:22,
  },
  headStyle:{
    flexDirection:'row',
    width:SCREEN_WIDTH,
    justifyContent:"center",
    alignItems:'center',
    backgroundColor:'#F2F2F2',
    paddingTop:15,
    paddingBottom:15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  courseWrap:{
    flexDirection:'row',
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: SCREEN_HEIGHT *0.3,
    backgroundColor:"#fff",
  },
  textstyle:{
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.06,
    backgroundColor: "#25C6FC",
    lineHeight: SCREEN_HEIGHT * 0.06,
    textAlign: "center",
    borderRadius: 50,
    color: "#fff"
  },
  listItem:{
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_HEIGHT * 0.04,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#A39F93"
  },
  headerNav:{
    flexDirection:'row',
  },
  navText1:{
    lineHeight: SCREEN_HEIGHT * 0.04,
    textAlign: "center",
    fontSize: 18
  },
  navText:{
    lineHeight: SCREEN_HEIGHT * 0.06,
    textAlign: "center",
    fontSize: 18
  },
  viewList:{
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_HEIGHT * 0.06,
    borderRightWidth: 1,
    borderBottomWidth:1,
    borderStyle: "solid",
    borderColor: "#A39F93"
  },
  typeText:{
    lineHeight: SCREEN_HEIGHT * 0.06,
    textAlign: "center",
    fontSize: 18,
    color: "blue"
  },
  statusText:{
    lineHeight: SCREEN_HEIGHT * 0.06,
    textAlign: "center",
    fontSize: 18,
    color: "red"
  }
}