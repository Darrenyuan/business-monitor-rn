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

  // collectPersonnel = () => {
  //   this.state.result.map(item => {
  //     return item.nickname;
  //   });
  // };

  componentDidMount() {
    apiFetchforeman({ projectId: 1 }).then(
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
          <TextInput
            value={this.state.title}
            autoFocus={true}
            onChangeText={title => this.setState({ title })}
            placeholderTextColor={'#BBBBBB'}
            underlineColorAndroid={'transparent'}
            placeholder={t('screen.creatissu_titleinput')}
            style={styles.titleInput}
          />
          <View style={styles.inputContainer}>
            <TextInput
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
            {/* {this.props.monitor.imagePaths.length !== 0 && (
                <Image
                  style={styles.img}
                  source={{ uri: URL + this.props.monitor.imagePaths[0] }}
                  resizeMode={'contain'}
                />
              ) && (
                <Image
                  style={styles.img}
                  source={{ uri: URL + this.props.monitor.imagePaths[1] }}
                  resizeMode={'contain'}
                />
              )} */}
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
            buttonStyle={{
              height: 50,
              width: 320,
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
              marginLeft: 20,
              marginTop: 40,
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
