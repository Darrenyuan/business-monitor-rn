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
  drawerLabel: t("drawer.projects_statistics"),
  drawerIcon: ({ tintColor }) => {
    return (
      <Icon
        name="user"
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
export default statisticsDetailsDrawerItem;
