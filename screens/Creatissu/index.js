import React, { Component } from "react";
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Image
} from "react-native";
import { CheckBox, Button, } from "react-native-elements";
// import CameraKitCamera from "react-native-camera-kit";
import CameraKitCamera from "./Camera";
import { Font } from "expo";
import Icon from "react-native-vector-icons/FontAwesome";
import CameraExample from "./Camera";
import { t } from "../../services/i18n";
import { bindActionCreators } from "redux";
import * as actions from "../../services/redux/actions";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import ModalDropdown from 'react-native-modal-dropdown';
import Projects from "../Projects";
import CreatissuStyle from './CreatissuStyle';
const styles = StyleSheet.create({ ...CreatissuStyle });
class Creatissu extends Component{
  constructor(props) {
    super(props);
    this.camaraRef= React.createRef();
    this.state = {
      
    };
  }
  render(){
    console.log('tytytytytytytytytytytytytytytytytytytytytyty');
    return(
      <View style={styles.container}>
       <Text style={styles.title}>{t("drawer.creatissu_label")}</Text>
        <View style = {styles.inputContainer}>
          <TextInput
              autoFocus = {true}
              placeholder = {t("screen.creatissu_textinput")} 
              placeholderTextColor = {'#BBBBBB'}
              underlineColorAndroid = {'transparent'} 
              style={styles.textInput}
              multiline
          />
        </View>
        <View>
          <Text>11111111</Text>
          <CameraExample/>
       {/* <CameraKitCamera
        ref={this.camaraRef}
            style={{
            flex: 1,
            backgroundColor: 'white'
          }}
          cameraOptions={{
            flashMode: 'auto',             // on/off/auto(default)
            focusMode: 'on',               // off/on(default)
            zoomMode: 'on',                // off/on(default)
            ratioOverlay:'1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
            ratioOverlayColor: '#00000077' // optional
          }}
        /> */}
        <Text>333333333</Text>
        </View>
        <View style={styles.modalDropdownContainer}>
            <ModalDropdown 
              defaultValue={t("screen.creatissu_modalDropdown1")}
              options={[t("screen.creatissu_modalDropdown1_item1"),t("screen.creatissu_modalDropdown1_item2"),
                        t("screen.creatissu_modalDropdown1_item3"),t("screen.creatissu_modalDropdown1_item4")]}
              style={styles.modalDropdown}
              textStyle={styles.textStyle}
              // dropdownStyle={styles.dropdownStyle}
              adjustFrame={styles.dropdownPosition} 
              // dropdownTextStyle={styles.dropdownText} 
            /> 
            <ModalDropdown 
              defaultValue={t("screen.creatissu_modalDropdown2")}
              options={[t("screen.creatissu_modalDropdown2_item1"),t("screen.creatissu_modalDropdown2_item2"),
                        t("screen.creatissu_modalDropdown2_item3"),t("screen.creatissu_modalDropdown2_item4"),
                        t("screen.creatissu_modalDropdown2_item5")]}
              style={styles.modalDropdown}
              textStyle={styles.textStyle} 
              dropdownStyle={styles.dropdownStyle}
            /> 
          </View>
        <Button 
          title={t("screen.creatissu_submit")}
          buttonStyle={{
            height: 50,
            width: 320,
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 30,
            marginLeft:20,
            marginTop:200
          }}
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