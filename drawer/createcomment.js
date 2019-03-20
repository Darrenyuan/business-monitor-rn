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
  drawerLabel: t('drawer.createcomment_label'),
  drawerIcon: ({ tintColor }) => {
    return (
      <Icon
        name="bullseye"
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
export default CreateCommentDrawerItem;
