import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
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
import Toast from 'react-native-root-toast';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './CreatissuStyle';
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
      visible: false,
      modalVisible: false,
      typenum: 0,
      userName: t('screen.createissue_modalDropdown2'),
    };
  }

  processImage = () => {
    this.props.actions.setIsInCamera({ isInCamera: true });
  };

  componentDidMount() {
    apiFetchforeman({ projectId: this.props.navigation.state.params.projectId }).then(
      res => {
        console.log('res.data.data', res.data.data);
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
    let _this = this;
    console.log('this.state.personnel', this.state.personnel);
    apiCreateIssues({
      name: this.state.title,
      type: this.state.type,
      description: this.state.description,
      handerId: this.state.personnel,
      projectId: this.props.navigation.state.params.projectId,
      imagePaths: JSON.stringify(this.props.monitor.imagePaths),
    }).then(
      res => {
        if (res.data.status === 200) {
          let toast = Toast.show(t('screen.successfully saved'), {
            position: SCREEN_HEIGHT * 0.45,
          });
          setTimeout(function() {
            Toast.hide(toast);
            _this.setState({
              title: '',
              description: '',
              type: null,
              personnel: '',
              personnelArr: [],
              result: [],
              index: 0,
            });
            _this.props.actions.setImagePaths({ imagePaths: [] });
            _this.props.navigation.navigate('ProblemStatisticsStack');
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
      title: '',
      description: '',
      type: null,
      personnel: '',
      personnelArr: [],
      result: [],
      index: 0,
    });
  }
  handleModelCancel = () => {
    this.setState({ modalVisible: false });
  };
  showImageView = () => {
    this.setState({ modalVisible: true });
  };

  _dropdown_renderRow(rowData, rowID) {
    let evenRow = rowID % 2;
    return (
      <View style={[styles.dropdown_row]}>
        <Text style={[styles.dropdown_row_text]}>{`${rowData}`}</Text>
      </View>
    );
  }

  render() {
    const paths = [];
    this.props.monitor.imagePaths.forEach(path => {
      paths.push({ url: `${URL}?path=${path}&width=862&height=812` });
    });
    const typeMap = new Map();
    typeMap.set(0, t('screen.problem_statistics_type_all'));
    typeMap.set(1, t('screen.problem_statistics_type_material'));
    typeMap.set(2, t('screen.problem_statistics_type_quality'));
    typeMap.set(3, t('screen.problem_statistics_type_security'));
    typeMap.set(4, t('screen.problem_statistics_type_other'));
    const statusMap = new Map();
    console.log('thiscreatissue', this);
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
              text: t('screen.problem_statistics_button_jump_drawer'),
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
              <TextInput
                returnKeyType="done"
                onChangeText={title => this.setState({ title })}
                value={this.state.title}
                placeholderTextColor={'#BBBBBB'}
                underlineColorAndroid={'transparent'}
                placeholder={t('screen.createissue_titleinput')}
                style={styles.titleInput}
                // autoFocus={true}
                // multiline={true}
              />
              <ModalDropdown
                defaultValue={typeMap.get(this.state.typenum)}
                options={[
                  t('screen.createissue_modalDropdown1_item1'),
                  t('screen.createissue_modalDropdown1_item2'),
                  t('screen.createissue_modalDropdown1_item3'),
                  t('screen.createissue_modalDropdown1_item4'),
                ]}
                style={styles.modalDropdown}
                textStyle={styles.textStyle}
                showsVerticalScrollIndicator={false}
                adjustFrame={pos => {
                  return pos;
                }}
                dropdownStyle={{ height: SCREEN_HEIGHT * 0.18 }}
                dropdownTextStyle={styles.dropdownTextStyle}
                // dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                renderRow={this._dropdown_renderRow.bind(this)}
                onSelect={(i, v) => {
                  this.setState({
                    type: +i + 1,
                    typenum: +i + 1,
                  });
                }}
              />
              <Text
                style={{
                  height: SCREEN_HEIGHT * 0.01,
                  width: SCREEN_WIDTH * 0.95,
                  backgroundColor: 'red',
                }}
              />
              <ModalDropdown
                defaultValue={this.state.userName}
                options={this.state.personnelArr}
                style={styles.modalDropdown}
                textStyle={styles.textStyle}
                showsVerticalScrollIndicator={false}
                adjustFrame={pos => {
                  return pos;
                }}
                dropdownStyle={{ height: SCREEN_HEIGHT * 0.18 }}
                dropdownTextStyle={styles.dropdownTextStyle}
                // dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                renderRow={this._dropdown_renderRow.bind(this)}
                onSelect={(i, v) => {
                  this.setState({
                    personnel: this.state.result[i].userId,
                    userName: v,
                  });
                }}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  returnKeyType="done"
                  value={this.state.description}
                  onChangeText={description => this.setState({ description })}
                  placeholder={t('screen.createissue_textinput')}
                  placeholderTextColor={'#BBBBBB'}
                  underlineColorAndroid={'transparent'}
                  style={styles.textInput}
                  multiline={true}
                />
              </View>

              {paths.length !== 0 && (
                <TouchableOpacity onPress={this.showImageView}>
                  <Image style={styles.image} resizeMode="cover" source={{ uri: paths[0].url }} />
                </TouchableOpacity>
              )}

              <View style={styles.btnContainer}>
                <Button
                  onPress={this.processImage}
                  title={t('screen.createissue_photo')}
                  buttonStyle={styles.picture_upload}
                />
                <Button
                  onPress={this.createIssues.bind(this)}
                  title={t('screen.statisticsDetails_submit')}
                  buttonStyle={styles.picture_upload}
                />
              </View>
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
)(withLogin(Creatissu));
