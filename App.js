import React from "react";
import {
  Platform,
  Dimensions,
  View,
  Text,
  I18nManager as RNI18nManager
} from "react-native";
import { Image, Icon } from "react-native-elements";
import {
  createDrawerNavigator,
  createAppContainer,
  DrawerItems
} from "react-navigation";
import PropTypes from "prop-types";
import LoginDrawerItem from "./drawer/login";
import ProjectsDrawerItem from "./drawer/projects";
import i18n from "./services/i18n";
import en from "./lang/en.json";
import zh from "./lang/zh.json";
import configureStore from "./services/common/configStore";
import { Provider } from "react-redux";
import CreatissuDrawerItem from "./drawer/creatissu";

const store = configureStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isI18nInitialized: false
    };
  }
  componentDidMount() {
    if (!i18n.locale) {
      i18n
        .init()
        .then(() => {
          const RNDir = RNI18nManager.isRTL ? "RTL" : "LTR";

          // RN doesn't always correctly identify native
          // locale direction, so we force it here.
          if (i18n.dir !== RNDir) {
            const isLocaleRTL = i18n.dir === "RTL";

            RNI18nManager.forceRTL(isLocaleRTL);

            // RN won't set the layout direction if we
            // don't restart the app's JavaScript.
            Expo.Updates.reloadFromCache();
          }
          console.log("====================>into app.js");
          i18n.t("loading");
          console.log("en=" + { ...en });
          console.log("zh=" + { ...zh });
          i18n.addResourceBundle("en", "common", {
            ...en
          });
          i18n.addResourceBundle("zh", "common", {
            ...zh
          });
          i18n.t("loading");
          this.setState({ isI18nInitialized: true });
          console.log("<<====================return app.js componentDidMount");
        })
        .catch(error => console.warn(error));
    }
  }

  render() {
    if (this.state.isI18nInitialized) {
      return (
        <Provider store={store}>
          <RootTabs {...this.state} />
        </Provider>
      );
    }
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get("window").width;

const CustomDrawerContentComponent = props => {
  return (
    <View style={{ flex: 1, backgroundColor: "#43484d" }}>
      <View
        style={{
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={require("./assets/icons/app-icon.png")}
          style={{ width: SCREEN_WIDTH * 0.57 }}
          resizeMode="contain"
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <DrawerItems {...props} />
      </View>
    </View>
  );
};

const HomeIcon = ({ focused, tintColor }) => (
  <Icon
    name="man"
    type="entypo"
    size={26}
    color={focused ? tintColor : "gray"}
  />
);

const RootTabs = props => {
  console.log("RootTab render");
  console.log("props=", JSON.stringify(props));
  if (!props.isI18nInitialized) {
    return <View>loading</View>;
  }
  const Root = createAppContainer(
    createDrawerNavigator(
      {
        login: LoginDrawerItem,
        projects: ProjectsDrawerItem,
        creatissu: CreatissuDrawerItem
      },
      {
        initialRouteName: "login",
        contentOptions: {
          activeTintColor: "#548ff7",
          activeBackgroundColor: "transparent",
          inactiveTintColor: "#ffffff",
          inactiveBackgroundColor: "transparent",
          labelStyle: {
            fontSize: 15,
            marginLeft: 0
          }
        },
        drawerWidth: SCREEN_WIDTH * 0.8,
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: "DrawerOpen",
        drawerCloseRoute: "DrawerClose",
        drawerToggleRoute: "DrawerToggle"
      }
    )
  );
  return <Root/>;
};

HomeIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  tintColor: PropTypes.string.isRequired
};
