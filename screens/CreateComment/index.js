import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, DeviceEventEmitter } from 'react-native';
import { Button, Image, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { t } from '../../services/i18n';
import { bindActionCreators } from 'redux';
import * as actions from '../../services/redux/actions';
import { connect } from 'react-redux';
import CreateCommentStyle from './CreateCommentStyle';
import CameraScreen from '../Creatissu/CameraScreen';
import { URL, apiCreatecomment, apiupdateIssueStatus } from '../../services/axios/api';
import Toast from 'react-native-root-toast';
import withLogin from '../../services/common/withLogin';
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
    let _this = this;
    apiCreatecomment({
      issueId: _this.props.navigation.state.params.issueId,
      content: this.state.description,
      username: this.props.monitor.loginData.username,
      imagePaths: JSON.stringify(this.props.monitor.imagePaths),
    }).then(
      res => {
        if (res.data.status === 200) {
          let toast = Toast.show('保存成功', {
            position: 240,
          });
          setTimeout(function() {
            Toast.hide(toast);
            apiupdateIssueStatus({
              issueId: _this.props.navigation.state.params.issueId,
              status: 2,
            }).then(() => {
              _this.props.actions.setIssueStatus({
                issueId: _this.props.navigation.state.params.issueId,
                status: 2,
              });
              DeviceEventEmitter.emit('xxxName', true);
              _this.props.navigation.navigate('ProblemStatisticsStack');
            });
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
  goback(text) {
    this.props.navigation.navigate(text);
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
          <Header
            leftComponent={
              <View>
                <Text
                  onPress={this.goback.bind(this, 'ProblemStatisticsStack')}
                  style={{ color: '#fff', fontSize: 18, marginLeft: 10 }}
                >
                  {t('screen.header_return')}
                </Text>
              </View>
            }
            centerComponent={{ text: this.state.name, style: { color: '#fff', fontSize: 18 } }}
            rightComponent={
              <View>
                <Icon
                  name="home"
                  color="#fff"
                  size={28}
                  iconStyle={{ marginRight: 10 }}
                  onPress={this.goback.bind(this, 'projectsStack')}
                />
              </View>
            }
          />
          <View style={styles.inputContainer}>
            <TextInput
              returnKeyType="done"
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
              placeholder={t('screen.createcomment_titleinput')}
              underlineColorAndroid={'transparent'}
              style={styles.textInput}
              multiline
            />
          </View>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{ uri: paths[0] }} resizeMethod={'resize'} />
            <Image style={styles.img} source={{ uri: paths[1] }} resizeMethod={'resize'} />
            <Button
              title={t('screen.createissue_photo')}
              buttonStyle={styles.picture_upload}
              onPress={this.processImage}
            />
          </View>
          <Button
            onPress={this.CreateComment.bind(this)}
            title={t('screen.submit')}
            buttonStyle={styles.submit}
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
)(withLogin(CreateComment));
