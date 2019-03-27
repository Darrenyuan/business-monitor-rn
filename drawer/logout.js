import React from 'react';
import { StackNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { t } from '../services/i18n';
import Logout from '../screens/Logout';
const LogoutDrawerItem = createStackNavigator(
  {
    logoutStack: {
      screen: Logout,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'logoutStack',
  },
);

LogoutDrawerItem.navigationOptions = ({ navigation }) => ({
  drawerLabel: t('drawer.logout_label'),
  drawerIcon: ({ tintColor }) => {
    return (
      <Icon
        name="user"
        size={30}
        iconStyle={{
          width: 30,
          height: 30,
        }}
        color={tintColor}
      />
    );
  },
});
export default LogoutDrawerItem;
