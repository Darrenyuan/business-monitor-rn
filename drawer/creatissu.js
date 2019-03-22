import React from 'react';
import { StackNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { t } from '../services/i18n';
import Creatissu from '../screens/Creatissu';
const CreatissuDrawerItem = createStackNavigator(
  {
    creatissuStack: {
      screen: Creatissu,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'creatissuStack',
  },
);

CreatissuDrawerItem.navigationOptions = ({ navigation }) => ({
  drawerLabel: () => null,
  drawerIcon: () => null,
});
export default CreatissuDrawerItem;
