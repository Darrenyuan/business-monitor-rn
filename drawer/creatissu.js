import React from "react";
import { StackNavigator, createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import { t } from "../services/i18n";
import Creatissu from "../screens/Creatissu";
const CreatissuDrawerItem = createStackNavigator(
  {
    creatissuStack: {
      screen: Creatissu
    }
  },
  {
    headerMode: "none",
    initialRouteName: "creatissuStack"
  }
);

CreatissuDrawerItem.navigationOptions = ({ navigation }) => ({
  drawerLabel: t("drawer.creatissu_label"),
  drawerIcon: ({ tintColor }) => {
    return (
      <Icon
        name="bullseye"
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
export default CreatissuDrawerItem;
