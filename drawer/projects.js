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
  drawerLabel: t("drawer.projects_label"),
  drawerIcon: ({ tintColor }) => {
    return (
      <Icon
        name="air"
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
