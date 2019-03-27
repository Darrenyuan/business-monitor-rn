import Login from './screens/Login';
import Creatissu from './screens/Creatissu';
import CreateComment from './screens/CreateComment';
import ProjectDetails from './screens/ProjectDetails';
import ProblemStatistics from './screens/ProblemStatistics';
import statisticsDetails from './screens/statisticsDetails';
import Projects from './screens/Projects';
import MainTab from './tab/TabNavigation';

const RouteConfig = {
  loginStack: {
    screen: Login,
    //navigationOptions: ({navigation}) => ({header: null})
  },
  creatissuStack: {
    screen: Creatissu,
    navigationOptions: ({ navigation }) => ({ header: null, gesturesEnable: true }),
  },
  projectsStack: {
    screen: MainTab,
    navigationOptions: ({ navigation }) => ({ header: null, gesturesEnable: true }),
  },
  ProjectDetailsStack: {
    screen: ProjectDetails,
    navigationOptions: ({ navigation }) => ({ header: null, gesturesEnable: true }),
  },
  ProblemStatisticsStack: {
    screen: ProblemStatistics,
    navigationOptions: ({ navigation }) => ({ header: null, gesturesEnable: true }),
  },

  statisticsDetailsStack: {
    screen: statisticsDetails,
    navigationOptions: ({ navigation }) => ({ header: null, gesturesEnable: true }),
  },
  createCommentStack: {
    screen: CreateComment,
    navigationOptions: ({ navigation }) => ({ header: null, gesturesEnable: true }),
  },
};

export default RouteConfig;
