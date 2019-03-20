import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { t } from '../../services/i18n';
import { bindActionCreators } from 'redux';
import * as actions from '../../services/redux/actions';
import { connect } from 'react-redux';
import CreateCommentStyle from './CreateCommentStyle';
import CameraScreen from '../Creatissu/CameraScreen';
import { URL } from '../../services/axios/api';
import { apiCreatecomment } from '../../services/axios/api';
import Toast from 'react-native-root-toast';
const styles = StyleSheet.create({ ...CreateCommentStyle });

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.camaraRef = React.createRef();
    this.state = {
      description: '',
      visible: false,
    };
  }

  processImage = () => {
    this.props.actions.setIsInCamera({ isInCamera: true });
  };

  CreateComment() {
    apiCreatecomment({
      content: this.state.description,
      username: this.props.monitor.loginData.username,
    }).then(
      res => {
        if (res.data.status === 200) {
          let toast = Toast.show('保存成功', {
            position: 240,
          });
          setTimeout(function() {
            Toast.hide(toast);
          }, 2000);
        } else {
          let toast = Toast.show('保存失败', {
            position: 240,
          });
          setTimeout(function() {
            Toast.hide(toast);
          }, 2000);
        }
      },
      err => {},
    );
  }

  render() {
    const paths = [];
    this.props.monitor.imagePaths.forEach(element => {
      paths.push(URL + element);
    });

    if (this.props.monitor.isInCamera) {
      return <CameraScreen />;
    } else
      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.description}
              autoFocus={true}
              onChangeText={description => this.setState({ description })}
              placeholder={t('screen.createcomment_titleinput')}
              placeholderTextColor={'#BBBBBB'}
              underlineColorAndroid={'transparent'}
              style={styles.textInput}
              multiline
            />
          </View>
          <View style={styles.imgContainer}>
            {paths.map(item => {
              return <Image style={styles.img} source={{ uri: item }} resizeMethod={'resize'} />;
            })}
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
          <Button
            onPress={this.CreateComment.bind(this)}
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
)(CreateComment);
