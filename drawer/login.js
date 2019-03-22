import React from "react";
import { StackNavigator, createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import { t } from "../services/i18n";
import Login from "../screens/Login";
const LoginDrawerItem = createStackNavigator(
  {
    loginStack: {
      screen: Login
    }
  },
  {
    headerMode: "none",
    initialRouteName: "loginStack"
  }
);

LoginDrawerItem.navigationOptions = ({ navigation }) => ({
  drawerLabel: t("drawer.login_label"),
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
export default LoginDrawerItem;
