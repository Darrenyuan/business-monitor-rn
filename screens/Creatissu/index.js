import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, Image, Modal } from 'react-native';
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { t } from '../../services/i18n';
import { bindActionCreators } from 'redux';
import * as actions from '../../services/redux/actions';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import CreatissuStyle from './CreatissuStyle';
import CameraScreen from './CameraScreen';
import { URL } from '../../services/axios/api';
import { apiCreateIssues, apiFetchforeman } from '../../services/axios/api';
import withLogin from '../../services/common/withLogin';
import ImageViewer from 'react-native-image-zoom-viewer';
const styles = StyleSheet.create({ ...CreatissuStyle });
class Creatissu extends Component {
  constructor(props) {
    super(props);
    this.camaraRef = React.createRef();
    this.state = {
      title: '',
      description: '',
      type: null,
      personnel: '',
      personnelArr: [],
      result: [],
      index: 0,
      modalVisible: false,
    };
  }

  processImage = () => {
    this.props.actions.setIsInCamera({ isInCamera: true });
  };

  componentDidMount() {
    apiFetchforeman({ projectId: this.props.navigation.state.params.projectId }).then(
      res => {
        this.setState({
          result: res.data.data,
        });
        this.setState({
          personnelArr: res.data.data.map(item => {
            return item.nickname;
          }),
        });
      },
      err => {},
    );
  }

  createIssues() {
    apiCreateIssues({
      name: this.state.title,
      type: this.state.type,
      description: this.state.description,
      handerId: this.state.personnel,
      projectId: this.props.navigation.state.params.projectId,
      imagePaths: JSON.stringify(this.props.monitor.imagePaths),
    }).then(
      res => {
        this.props.navigation.navigate('ProblemStatisticsStack');
      },
      err => {},
    );
  }

  goback(text) {
    this.props.navigation.navigate(text);
  }
  handleModelCancel = () => {
    this.setState({ modalVisible: false });
  };
  showImageView = () => {
    this.setState({ modalVisible: true });
  };

  render() {
    // const images = [{ url: 'http://aboutreact.com/wp-content/uploads/2018/07/sample_img.png' }];
    const paths = [];
    this.props.monitor.imagePaths.forEach(path => {
      paths.push({ url: `${URL}?path=${path}&width=862&height=812` });
    });
    console.log(paths);
    if (this.props.monitor.isInCamera) {
      return <CameraScreen />;
    } else if (this.state.modalVisible && paths.length > 0) {
      return (
        <Modal
          visible={this.state.modalVisible}
          transparent={false}
          onRequestClose={() => this.handleModelCancel()}
        >
          <ImageViewer imageUrls={paths} enableSwipeDown onLongPress={this.handleModelCancel} />
        </Modal>
      );
    } else
      return (
        <View style={styles.container}>
          <View />
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
          <TextInput
            returnKeyType="done"
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            placeholderTextColor={'#BBBBBB'}
            underlineColorAndroid={'transparent'}
            placeholder={t('screen.createissue_titleinput')}
            style={styles.titleInput}
          />
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
              placeholder={t('screen.createissue_textinput')}
              placeholderTextColor={'#BBBBBB'}
              underlineColorAndroid={'transparent'}
              style={styles.textInput}
              multiline
            />
          </View>
          <View style={styles.imgContainer}>
            <Button
              onPress={this.processImage}
              title={t('screen.createissue_photo')}
              buttonStyle={styles.picture_upload}
            />
            <Button
              onPress={this.showImageView}
              title="图片浏览"
              disabled={paths.length === 0}
              buttonStyle={styles.picture_upload}
            />
          </View>
          <View style={styles.modalDropdownContainer}>
            <ModalDropdown
              defaultValue={t('screen.createissue_modalDropdown1')}
              options={[
                t('screen.createissue_modalDropdown1_item1'),
                t('screen.createissue_modalDropdown1_item2'),
                t('screen.createissue_modalDropdown1_item3'),
                t('screen.createissue_modalDropdown1_item4'),
              ]}
              style={styles.modalDropdown}
              textStyle={styles.textStyle}
              // dropdownStyle={styles.dropdownStyle}
              adjustFrame={styles.dropdownPosition}
              // dropdownTextStyle={styles.dropdownText}
              onSelect={(i, v) => {
                this.setState({
                  type: +i + 1,
                });
              }}
            />
            <ModalDropdown
              defaultValue={t('screen.createissue_modalDropdown2')}
              options={this.state.personnelArr}
              style={styles.modalDropdown}
              textStyle={styles.textStyle}
              dropdownStyle={styles.dropdownStyle}
              onSelect={(i, v) => {
                this.setState({
                  personnel: this.state.result[i].userId,
                });
              }}
            />
          </View>
          <Button
            onPress={this.createIssues.bind(this)}
            title={t('screen.statisticsDetails_submit')}
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
)(withLogin(Creatissu));
