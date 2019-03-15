import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { t } from '../../services/i18n';
import { bindActionCreators } from 'redux';
import * as actions from '../../services/redux/actions';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import CreatissuStyle from './CreatissuStyle';
import CameraScreen from './CameraScreen';
import { URL } from '../../services/axios/api';
// import console = require('console');
const styles = StyleSheet.create({ ...CreatissuStyle });
class Creatissu extends Component {
  constructor(props) {
    super(props);
    this.camaraRef = React.createRef();
    this.state = {
      description: '',
      type: null,
      personnel: '',
    };
  }
  processImage = () => {
    this.props.actions.setIsInCamera({ isInCamera: true });
  };
  render() {
    if (this.props.monitor.isInCamera) {
      return <CameraScreen />;
    } else
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{t('drawer.creatissu_label')}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={description => this.setState({ description })}
              // value={this.state.description}
              autoFocus={true}
              placeholder={t('screen.creatissu_textinput')}
              placeholderTextColor={'#BBBBBB'}
              underlineColorAndroid={'transparent'}
              style={styles.textInput}
              multiline
            />
          </View>
          <Text>{this.state.description}</Text>
          <View style={styles.imgContainer}>
            {this.props.monitor.imagePaths.length !== 0 && (
                <Image
                  style={styles.img}
                  source={{ uri: URL + this.props.monitor.imagePaths[0] }}
                  resizeMode={'contain'}
                />
              ) && (
                <Image
                  style={styles.img}
                  resizeMode={'contain'}
                  source={{ uri: URL + this.props.monitor.imagePaths[1] }}
                />
              )}
            <Button
              title={t('screen.creatissu_photo')}
              buttonStyle={{
                height: 50,
                width: 100,
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 4,
                marginTop: 35,
              }}
              onPress={this.processImage}
            />
          </View>
          <View style={styles.modalDropdownContainer}>
            <ModalDropdown
              defaultValue={t('screen.creatissu_modalDropdown1')}
              options={[
                t('screen.creatissu_modalDropdown1_item1'),
                t('screen.creatissu_modalDropdown1_item2'),
                t('screen.creatissu_modalDropdown1_item3'),
                t('screen.creatissu_modalDropdown1_item4'),
              ]}
              style={styles.modalDropdown}
              textStyle={styles.textStyle}
              // dropdownStyle={styles.dropdownStyle}
              adjustFrame={styles.dropdownPosition}
              // dropdownTextStyle={styles.dropdownText}
              onSelect={(i, v) => {
                this.setState({
                  type: i + 1,
                });
              }}
            />
            <ModalDropdown
              defaultValue={t('screen.creatissu_modalDropdown2')}
              options={[
                t('screen.creatissu_modalDropdown2_item1'),
                t('screen.creatissu_modalDropdown2_item2'),
                t('screen.creatissu_modalDropdown2_item3'),
                t('screen.creatissu_modalDropdown2_item4'),
                t('screen.creatissu_modalDropdown2_item5'),
              ]}
              style={styles.modalDropdown}
              textStyle={styles.textStyle}
              dropdownStyle={styles.dropdownStyle}
              onSelect={(i, v) => {
                this.setState({
                  // personnel: v,
                });
              }}
            />
          </View>
          <Button
            onPress={this.processImage}
            title={t('screen.creatissu_submit')}
            buttonStyle={{
              height: 50,
              width: 320,
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
              marginLeft: 20,
              marginTop: 105,
            }}
          />
        </View>
      );
  }
}

function mapStateToProps(state) {
  return {
    monitor: state,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Creatissu);
