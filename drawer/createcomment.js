import React from 'react';
import { StackNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { t } from '../services/i18n';
import CreateComment from '../screens/CreateComment';
const CreateCommentDrawerItem = createStackNavigator(
  {
    createCommentStack: {
      screen: CreateComment,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'createCommentStack',
  },
);

CreateCommentDrawerItem.navigationOptions = ({ navigation }) => ({
  drawerLabel: () => null,
  drawerIcon: () => null,
});
export default CreateCommentDrawerItem;
