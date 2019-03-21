import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, Image } from 'react-native';
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
      err => {
        // console.log(err);
      },
    );
  }

  createIssues() {
    apiCreateIssues({
      name: this.state.title,
      type: this.state.type,
      description: this.state.description,
      handerId: this.state.personnel,
      imagePaths: JSON.stringify(this.props.monitor.imagePaths),
    }).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
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
                  {t('screen.creatissu_return')}
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
            autoFocus={true}
            returnKeyType="done"
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            placeholderTextColor={'#BBBBBB'}
            underlineColorAndroid={'transparent'}
            placeholder={t('screen.creatissu_titleinput')}
            style={styles.titleInput}
          />
          <View style={styles.inputContainer}>
            <TextInput
              returnKeyType="done"
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
              placeholder={t('screen.creatissu_textinput')}
              placeholderTextColor={'#BBBBBB'}
              underlineColorAndroid={'transparent'}
              style={styles.textInput}
              multiline
            />
          </View>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{ uri: paths[0] }} resizeMethod={'resize'} />
            <Image style={styles.img} source={{ uri: paths[1] }} resizeMethod={'resize'} />
            <Button
              onPress={this.processImage}
              title={t('screen.creatissu_photo')}
              buttonStyle={styles.picture_upload}
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
                  type: +i + 1,
                });
              }}
            />
            <ModalDropdown
              defaultValue={t('screen.creatissu_modalDropdown2')}
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
            title={t('screen.creatissu_submit')}
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
)(Creatissu);
