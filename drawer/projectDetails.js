import React from "react";
import { StackNavigator, createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import { t } from "../services/i18n";
import ProjectDetails from "../screens/ProjectDetails";
const ProjectsDrawerItem = createStackNavigator(
  {
    ProjectDetailsStack: {
      screen: ProjectDetails
    }
  },
  {
    headerMode: "none",
    initialRouteName: "ProjectDetailsStack"
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
