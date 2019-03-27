import React, { PureComponent } from 'react';
import { Image, StyleSheet, Platform, Animated } from 'react-native';
import Projects from '../screens/Projects';
import ProblemStatistics from '../screens/ProblemStatistics';
import Mine from '../screens/Logout';
import { createBottomTabNavigator } from 'react-navigation';
const ProjectsTabSelectedIcon = require('../assets/icons/tabbar_order_selected.png');
const ProjectsTabUnSelectedIcon = require('../assets/icons/tabbar_order.png');
const IssuesTabSelectedIcon = require('../assets/icons/tabbar_discover_selected.png');
const IssuesTabUnSelectedIcon = require('../assets/icons/tabbar_discover.png');
const MineTabSelectedIcon = require('../assets/icons/tabbar_mine_selected.png');
const MineTabUnSelectedIcon = require('../assets/icons/tabbar_mine.png');
export default (MyTabNavigator = createBottomTabNavigator(
  {
    projects: {
      screen: Projects,
      navigationOptions: ({ navigation, screeProps }) => ({
        //这里设置StackNavigator属性和一般情况下Tabbar不同页面可能会不同的属性

        //设置StackNavigator属性
        header: null,
        headerTitle: '项目',
        headerStyle: styles.navigator,
        headerTitleStyle: styles.navigatorTitle,
        gesturesEnabled: true,

        //这里设置Tabbar不同页面可能会不同的属性
        tabBarVisible: true,
        tabBarLabel: '项目',
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Image
              source={focused ? ProjectsTabSelectedIcon : ProjectsTabUnSelectedIcon}
              style={styles.tabbarImage}
            />
          );
        },
      }),
    },
    mine: {
      screen: Mine,
      navigationOptions: ({ navigation, screeProps }) => ({
        //这里设置StackNavigator属性和一般情况下Tabbar不同页面可能会不同的属性

        //设置StackNavigator属性
        header: null,
        headerTitle: '我的',
        headerStyle: styles.navigator,
        headerTitleStyle: styles.navigatorTitle,
        gesturesEnabled: true,

        //这里设置Tabbar不同页面可能会不同的属性
        tabBarVisible: true,
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Image
              source={focused ? MineTabSelectedIcon : MineTabUnSelectedIcon}
              style={styles.tabbarImage}
            />
          );
        },
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#007AFF' : '#00bcd4',
      activeBackgroundColor: Platform.OS === 'ios' ? 'transparent' : 'white',
      inactiveTintColor: Platform.OS === 'ios' ? '#616161' : 'white',
      inactiveBackgroundColor: Platform.OS === 'ios' ? 'transparent' : 'white',
      showIcon: true,
      showLabel: true,
      labelStyle: {
        fontSize: 10,
      },
    },
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    initialRouteName: 'projects',
  },
));

const styles = StyleSheet.create({
  navigatorTitle: {
    fontSize: 17,
    color: 'white',
  },
  navigator: {
    backgroundColor: '#d81e06',
  },
  tabbarImage: {
    width: 25,
    height: 25,
    marginBottom: -3,
  },
});
