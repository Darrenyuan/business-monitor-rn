import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { Button, Image, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { t } from '../../services/i18n';
import { SCREEN_HEIGHT } from './CreateCommentStyle';
import { bindActionCreators } from 'redux';
import * as actions from '../../services/redux/actions';
import { connect } from 'react-redux';
import CreateCommentStyle from './CreateCommentStyle';
import CameraScreen from '../Creatissu/CameraScreen';
import { URL, apiCreatecomment, apiupdateIssueStatus } from '../../services/axios/api';
import Toast from 'react-native-root-toast';
import withLogin from '../../services/common/withLogin';
import ImageViewer from 'react-native-image-zoom-viewer';
const styles = StyleSheet.create({ ...CreateCommentStyle });

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.camaraRef = React.createRef();
    this.state = {
      description: '',
      visible: false,
      modalVisible: false,
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
      replyToId: 0,
    }).then(
      res => {
        if (res.data.status === 200) {
          let toast = Toast.show(t('screen.successfully saved'), {
            position: SCREEN_HEIGHT * 0.45,
          });
          setTimeout(function() {
            Toast.hide(toast);
            _this.setState({
              description: '',
              visible: false,
            });
            _this.props.actions.setImagePaths({ imagePaths: [] });
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
          let toast = Toast.show(t('screen.save failed'), {
            position: SCREEN_HEIGHT * 0.45,
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
    this.setState({
      description: '',
      visible: false,
    });
  }
  handleModelCancel = () => {
    this.setState({ modalVisible: false });
  };
  showImageView = () => {
    this.setState({ modalVisible: true });
  };
  render() {
    const paths = [];
    this.props.monitor.imagePaths.forEach(path => {
      paths.push({ url: `${URL}?path=${path}&width=862&height=812` });
    });
    if (this.props.monitor.isInCamera) {
      return <CameraScreen />;
    } else if (this.state.modalVisible && paths.length > 0) {
      return (
        <Modal
          visible={this.state.modalVisible}
          transparent={false}
          onRequestClose={() => this.handleModelCancel()}
        >
          <ImageViewer
            imageUrls={paths}
            enableSwipeDown
            onLongPress={this.handleModelCancel}
            onClick={this.handleModelCancel.bind(this)}
          />
        </Modal>
      );
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
            centerComponent={{
              text: t('screen.createcomment_titleinput'),
              style: { color: '#fff', fontSize: 18 },
            }}
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              <View style={styles.inputContainer}>
                <TextInput
                  returnKeyType="done"
                  value={this.state.description}
                  onChangeText={description => this.setState({ description })}
                  placeholder={t('screen.createcomment_titleinput')}
                  underlineColorAndroid={'transparent'}
                  style={styles.textInput}
                  autoFocus={true}
                  multiline={true}
                />
              </View>

              <View style={styles.imgContainer}>
                {paths.length !== 0 && (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={this.showImageView}>
                      <Image
                        style={styles.img}
                        resizeMethod={'resize'}
                        source={{ uri: paths[0].url }}
                      />
                    </TouchableOpacity>
                    {
                      paths.length > 1 && <TouchableOpacity onPress={this.showImageView}>
                        <Image
                          style={styles.img}
                          resizeMethod={'resize'}
                          source={{ uri: paths[1].url }}
                        />
                      </TouchableOpacity>
                    }

                  </View>
                )}
                <TouchableOpacity onPress={this.processImage}>
                  <Image
                    style={styles.img}
                    source={require('../../assets/icons/addImage.png')}
                    resizeMethod={'resize'}
                  />
                </TouchableOpacity>
              </View>

              <Button
                onPress={this.CreateComment.bind(this)}
                title={t('screen.submit')}
                buttonStyle={styles.submit}
                titleStyle={{ fontSize: 20 }}
              />
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
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
