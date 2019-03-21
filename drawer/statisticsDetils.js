import React from "react";
import { StackNavigator, createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import { t } from "../services/i18n";
import statisticsDetails from "../screens/statisticsDetails";
const statisticsDetailsDrawerItem = createStackNavigator(
  {
    statisticsDetailsStack: {
      screen: statisticsDetails
    }
  },
  {
    headerMode: "none",
    initialRouteName: "statisticsDetailsStack"
  }
);

statisticsDetailsDrawerItem.navigationOptions = ({ navigation }) => ({
  drawerLabel: () => null,
  drawerIcon: () => null,
});
export default statisticsDetailsDrawerItem;
