import React from "react";
import { StackNavigator, createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import { t } from "../services/i18n";
import ProblemStatistics from "../screens/ProblemStatistics";
const ProblemStatisticsDrawerItem = createStackNavigator(
  {
    ProblemStatisticsStack: {
      screen: ProblemStatistics
    }
  },
  {
    headerMode: "none",
    initialRouteName: "ProblemStatisticsStack"
  }
);

ProblemStatisticsDrawerItem.navigationOptions = ({ navigation }) => ({
  drawerLabel: t("drawer.projects_statistics"),
  drawerIcon: ({ tintColor }) => {
    return (
      <Icon
        name="air"
        size={30}
        iconStyle={{
          width: 30,
          height: 30
        }}
        color={tintColor}
      />
    );
  }
});
export default ProblemStatisticsDrawerItem;
