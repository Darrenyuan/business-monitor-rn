import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginStyle from './LoginStyle';
import { t } from '../../services/i18n';
import { bindActionCreators } from 'redux';
import * as actions from '../../services/redux/actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Projects from '../Projects';
import MainTab from '../../tab/TabNavigation';

const BG_IMAGE = require('../../assets/images/login_bg_screen.jpg');

const styles = StyleSheet.create({ ...LoginStyle });
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      username: '',
      username_valid: true,
      password: '',
      login_failed: false,
      showLoading: false,
    };
    this.usernameInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  async componentDidMount() {
    await Font.loadAsync({
      georgia: require('../../assets/fonts/Georgia.ttf'),
      regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  validateUsername(username) {
    var re = /^[\w.]+$/;

    return re.test(username);
  }

  submitLoginCredentials() {
    const { showLoading } = this.state;

    this.props.actions.login({
      username: this.usernameInput.current.props.value,
      password: this.passwordInput.current.props.value,
    });
    this.setState({
      showLoading: true,
      // username: '',
      // password: '',
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.monitor.loginError !== this.props.monitor.loginError) {
      if (this.props.monitor.loginError) {
        Alert.alert(t('screen.login_alert'), '', [
          { text: t('screen.login_alert_button_text'), onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
    if (prevProps.monitor.loginData !== this.props.monitor.loginData)
      if (this.props.monitor.loginData) {
        this.props.navigation.navigate('projectsStack');
      }
  }

  render() {
    const { username, password, username_valid } = this.state;
    const showLoading = Boolean(this.props.monitor.loginPending);
    const loginData = this.props.monitor.loginData;
    const { navigate } = this.props.navigation;
    console.log('loginData=%s', JSON.stringify(loginData));
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
            {this.state.fontLoaded ? (
              <View style={styles.loginView}>
                <View style={styles.loginTitle}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.travelText}>{t('screen.login_content_text1')}</Text>
                  </View>
                  <View style={{ marginTop: -10 }}>
                    <Text style={styles.travelText}>{t('screen.login_content_text2')}</Text>
                  </View>
                  <View style={{ marginTop: -10 }}>
                    <Text style={styles.travelText}>{t('screen.login_content_text3')}</Text>
                  </View>
                </View>
                <View style={styles.loginInput}>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Input
                      leftIcon={<Icon name="user-o" color="rgba(171, 189, 219, 1)" size={25} />}
                      containerStyle={{ marginVertical: 10 }}
                      onChangeText={username => this.setState({ username })}
                      value={username}
                      inputStyle={{ marginLeft: 10, color: 'white' }}
                      keyboardAppearance="light"
                      placeholder={t('screen.login_username')}
                      autoFocus={false}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      returnKeyType="done"
                      ref={this.usernameInput}
                      onSubmitEditing={() => {
                        this.setState({
                          username_valid: this.validateUsername(username),
                        });
                        this.passwordInput.current.focus();
                      }}
                      blurOnSubmit={false}
                      placeholderTextColor="white"
                      errorStyle={{ textAlign: 'center', fontSize: 12 }}
                      errorMessage={username_valid ? null : t('login.input_warning')}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Input
                      leftIcon={<Icon name="lock" color="rgba(171, 189, 219, 1)" size={25} />}
                      containerStyle={{ marginVertical: 10 }}
                      onChangeText={password => this.setState({ password })}
                      value={password}
                      inputStyle={{ marginLeft: 10, color: 'white' }}
                      secureTextEntry={true}
                      keyboardAppearance="light"
                      placeholder={t('screen.login_password')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="default"
                      returnKeyType="done"
                      ref={this.passwordInput}
                      blurOnSubmit={true}
                      placeholderTextColor="white"
                    />
                  </TouchableWithoutFeedback>
                </View>
                <Button
                  title={t('common:screen.login_button')}
                  activeOpacity={1}
                  underlayColor="transparent"
                  onPress={this.submitLoginCredentials.bind(this)}
                  loading={showLoading}
                  loadingProps={{ size: 'small', color: 'white' }}
                  buttonStyle={{
                    height: 50,
                    width: 250,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                  }}
                  containerStyle={{ marginVertical: 10 }}
                  titleStyle={{ fontWeight: 'bold', color: 'white' }}
                />
              </View>
            ) : (
              <Text>{t('loading')}Loading...</Text>
            )}
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
)(Login);
