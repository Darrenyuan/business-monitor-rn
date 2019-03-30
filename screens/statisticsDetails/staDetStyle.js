import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const fsc = SCREEN_HEIGHT - 180;
export default {
  worp: {
    flex: 1,
    height: SCREEN_HEIGHT,
  },
  viewWorp: {
    width: '100%',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#A39F93',
  },
  viewWorps: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#A39F93',
  },
  butViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SCREEN_HEIGHT * 0.03,
  },
  butStyle: {
    width: SCREEN_WIDTH * 0.3,
    marginRight: SCREEN_WIDTH * 0.06,
    marginLeft: SCREEN_WIDTH * 0.06,
    marginBottom: SCREEN_WIDTH * 0.06,
  },
  contenter: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  henderView: {
    height: SCREEN_HEIGHT * 0.04,
  },
  henderText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: SCREEN_HEIGHT * 0.07,
    textAlign: 'center',
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
    position: 'relative',
    left: -SCREEN_WIDTH * 0.23,
  },
  issue: {
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  modulStyle: {
    marginTop: fsc * 0.3,
    marginBottom: fsc * 0.1,
    fontSize: 18,
  },
  OpinionStyle: {
    width: SCREEN_WIDTH * 0.8,
    lineHeight: 18,
    color: 'red',
  },
  OpinStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 7,
    width: 90,
    height: 90,
    marginRight: 20,
  },
  title: {
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  Detail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  Detail1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: SCREEN_HEIGHT * 0.02,
    height: '100%',
  },
  peopel: {
    width: SCREEN_WIDTH * 0.45,
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  time: {
    width: SCREEN_WIDTH * 0.55,
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  name: {
    width: SCREEN_WIDTH * 0.63,
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  status: {
    width: SCREEN_WIDTH * 0.37,
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  fetchbutton: {
    position: 'relative',
    left: SCREEN_WIDTH * 0.57,
    marginTop: SCREEN_HEIGHT * 0.005,
    marginLeft: SCREEN_WIDTH * 0.1,
  },
  swiper: {
    display: 'flex',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.35,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  texts: {
    flexShrink: 0,
    width: SCREEN_WIDTH,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  issuecontenter: {
    display: 'flex',
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  History: {
    marginTop: SCREEN_HEIGHT * 0.06,
  },
  confirmbutton: {
    width: SCREEN_WIDTH * 0.3,
    marginTop: SCREEN_HEIGHT * 0.005,
  },
  showView: {
    width: SCREEN_WIDTH,
    marginTop: SCREEN_HEIGHT * 0.005,
  },
  swiper1: {
    height: SCREEN_HEIGHT * 0.35,
    width: SCREEN_WIDTH,
  },
  swiperImage: {
    flex: 1,
  },
};

export { SCREEN_HEIGHT, SCREEN_WIDTH };
