import React from "react";
import { StackNavigator, createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import { t } from "../services/i18n";
import Projects from "../screens/Projects";
const ProjectsDrawerItem = createStackNavigator(
  {
    projectsStack: {
      screen: Projects
    }
  },
  {
    headerMode: "none",
    initialRouteName: "projectsStack"
  }
);

ProjectsDrawerItem.navigationOptions = ({ navigation }) => ({
  tabBarLabel: t("drawer.projects_label"),
  tabBarIcon: ({ tintColor }) => {
    return (
      <Icon
        name="book"
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
export default ProjectsDrawerItem;
