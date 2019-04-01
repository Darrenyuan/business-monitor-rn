import React,  {Component }from 'react'; 
import {TextInput, StyleSheet, Text, View, Image, Modal, TouchableOpacity }from 'react-native'; 
import {Button, Header, Avatar }from 'react-native-elements'; 
import {Font }from 'expo'; 
import ActionSheet from 'react-native-actionsheet'; 
import LogoutStyle from './LogoutStyle'; 
import {t }from '../../services/i18n'; 
import {bindActionCreators }from 'redux'; 
import * as actions from '../../services/redux/actions'; 
import {connect }from 'react-redux'; 
import {apiLogout }from '../../services/axios/api'; 
import {NavigationActions }from 'react-navigation'; 
import Projects from '../Projects'; 
const styles = StyleSheet.create( {...LogoutStyle }); 

class Logout extends Component {
constructor(props) {
super(props); 
this.state =  {}; 
}
logout() {
apiLogout().then(
res =>  {
this.props.actions.logout(); 
this.props.navigation.navigate('loginStack'); 
}, 
err =>  {}, 
); 
}
render() {
// const characterList = {
//   admin:'管理员',

// };
if ( ! this.props.monitor.loginData) {
this.props.navigation.navigate('loginStack'); 
return < View /> ; 
}
return ( < View style =  {styles.container} >  < Avatar
          size = "large"
icon =  { {name:'home'}}
rounded
          containerStyle =  { {marginTop:115 }}
activeOpacity =  {0.7}
/>  < View style =  {styles.mineItemContainer} >  < View style =  {styles.mineItem} >  < Text style =  {styles.mineItem_left} >  {t('screen.mine_nickname')} </Text >  < Text style =  {styles.mineItem_right} >  {this.props.monitor.loginData.nickname} </Text >  </View >  < View style =  {styles.mineItem} >  < Text style =  {styles.mineItem_left} >  {t('screen.mine_username')} </Text >  < Text style =  {styles.mineItem_right} >  {this.props.monitor.loginData.username} </Text >  </View >  < View style =  {styles.mineItem} >  < Text style =  {styles.mineItem_left} >  {t('screen.mine_userId')} </Text >  < Text style =  {styles.mineItem_right} >  {this.props.monitor.loginData.userId} </Text >  </View >  < View style =  {styles.mineItem} >  < Text style =  {styles.mineItem_left} >  {t('screen.mine_permission')} </Text >  < Text style =  {styles.mineItem_right} >  {t(`screen.character_$ {this.props.monitor.loginData.roles[0].roleName}`)} </Text >  </View >  </View >  < Button
          onPress =  {this.logout.bind(this)}
title =  {t('screen.logout_content_text1')}
buttonStyle =  {styles.submit}
titleStyle =  { {fontSize:20 }}
/>  </View > ); 
}
}

function mapStateToProps(state) {
return {
monitor:state, 
}; 
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
return {
actions:bindActionCreators( {...actions }, dispatch), 
}; 
}

export default connect(
mapStateToProps, 
mapDispatchToProps, )(Logout); 
