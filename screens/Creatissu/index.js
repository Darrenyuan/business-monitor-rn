import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions
} from "react-native";
import { CheckBox, Button, } from "react-native-elements";
import { Font } from "expo";
import Icon from "react-native-vector-icons/FontAwesome";
import CreatissuStyle from "./CreatissuStyle";
import { t } from "../../services/i18n";
import { bindActionCreators } from "redux";
import * as actions from "../../services/redux/actions";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import ModalDropdown from 'react-native-modal-dropdown';
import Projects from "../Projects";

const styles = StyleSheet.create({ ...CreatissuStyle });
class Creatissu extends Component{
  render(){
    return(
      <View>

        {/* <ModalDropdown 
           defaultValue=
           options={}
           style={{
            height: 50,
            width: 250,
            backgroundColor: "blue"
           }}
        /> */}
        <Button 
          title="Solid Button"
          // buttonStyle={{
          //   height: 50,
          //   width: 250,
          //   backgroundColor: "transparent",
          //   borderWidth: 2,
          //   borderColor: "white",
          //   borderRadius: 30
          // }}
        />
      </View>
    );
  }
}



function mapStateToProps(state) {
  return {
    monitor: state
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Creatissu);