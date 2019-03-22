import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  DeviceEventEmitter,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../services/redux/actions';
import { Button, Header, Image, Icon, Overlay, Input } from 'react-native-elements';
import staDetStyle from './staDetStyle';
import { t } from '../../services/i18n';
import { URL } from '../../services/axios/api';
import { apiCreateReply, apiupdateIssueStatus, apiIssueDetail } from '../../services/axios/api';
import withLogin from '../../services/common/withLogin';
const styles = StyleSheet.create({ ...staDetStyle });

class StatisticsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: t('drawer.statistics_details'),
      isVisible: false,
      texts: '',
      bool: true,
      disabled: false,
      replyList: [],
      issueDetail: '',
    };
  }

  componentDidMount() {
    this.fetchReply();
    this.issueDetail();
  }
  fetchReply() {
    this.props.actions.fetchReplyList({
      issueId: this.props.navigation.state.params.issueId,
    });
    this.issueDetail();
  }
  issueDetail() {
    apiIssueDetail({
      issueId: this.props.navigation.state.params.issueId,
    }).then(res => {
      this.setState({
        issueDetail: res.data.data,
      });
    });
  }

  onperss(buttonStatusText) {
    if (buttonStatusText === t('screen.statisticsDetails_rectification')) {
      this.props.navigation.navigate('createCommentStack', {
        issueId: this.props.navigation.state.params.issueId,
      });
    } else {
      apiupdateIssueStatus({
        issueId: this.props.navigation.state.params.issueId,
        status: 3,
      }).then((res) => {
        this.props.navigation.navigate('ProblemStatisticsStack', {
          id: this.props.navigation.state.params.projectId,
          issueStatus: 1,
        });
        DeviceEventEmitter.emit('xxxName', true);
      });
    }
  }
  onpass(str) {
    this.setState({ isVisible: true });
  }
  goback(text) {
    this.props.navigation.navigate(text);
  }
  onChangeText(tex) {
    this.setState({
      texts: tex,
    });
  }
  onVisible() {
    this.setState({
      isVisible: false,
    });
    apiCreateReply({
      issueId: this.props.navigation.state.params.issueId,
      username: this.props.monitor.loginData.username,
      content: this.state.texts,
    }).then(res => {
      apiupdateIssueStatus({
        issueId: this.props.navigation.state.params.issueId,
        status: 1,
      });
      this.props.navigation.navigate('ProblemStatisticsStack', {
        id: this.props.navigation.state.params.projectId,
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation.state.params.issueId !== this.props.navigation.state.params.issueId) {
      this.issueDetail();
    }
  }
  scrollHandle(event) {
    const scrollOffset = event.nativeEvent.contentOffset.y;
    if (scrollOffset < -50) {
      this.fetchReply();
    }
  }
  render() {
    let issueReplyList = [];
    let buttonStatusText = '';
    let whoseIusseReply = [];
    let imagePathReply = [];
    let issueimagePath = [];
    let sponsorId = false;
    let foremanId = false;
    let issueId = this.props.navigation.state.params.issueId;
    let roleId = this.props.monitor.loginData.roles[0].roleId;
    let iusseItem = this.state.issueDetail;
    let status = this.props.navigation.state.params.status;
    console.log("status", status);
    let replyList = this.props.monitor.replyList.byId;
    console.log("this", this);
    if (iusseItem.imagePath !== undefined) {
      issueimagePath = (iusseItem.imagePath).split(",");
    }
    for (const key in replyList) {
      issueReplyList.push(replyList[key]);
    }
    whoseIusseReply = issueReplyList.filter(item => {
      return item.issueId === issueId && item.imagePath === '[]';
    });
    console.log('whoseIusseReply', whoseIusseReply);
    imagePathReply = issueReplyList.filter(item => {
      return item.imagePath !== '[]' && item.issueId === issueId;
    });
    console.log('imagePathReply', imagePathReply);

    sponsorId = roleId === iusseItem.sponsorId ? true : false;
    foremanId = roleId === iusseItem.handlerId ? true : false;
    buttonStatusText = foremanId ? t('screen.statisticsDetails_rectification') : t('screen.statisticsDetails_confirm');
    if (this.props.monitor.replyList.fetchReplyListPending) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.worp}>
        <Header
          leftComponent={
            <View>
              <Text
                onPress={this.goback.bind(this, 'ProblemStatisticsStack')}
                style={{ color: '#fff', fontSize: 18, marginLeft: 10 }}
              >
                {t('screen.statisticsDetails_return')}
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
        <ScrollView onScroll={evt => this.scrollHandle(evt)} scrollEventThrottle={50}>
          <View>
            <View style={styles.contenter}>
              <View style={styles.viewWorp}>
                <Text style={styles.henderText}>{iusseItem.name}</Text>
              </View>
              <View style={styles.viewWorps}>
                <View style={styles.imgStyle}>
                  <View style={styles.issueStyle}>
                    <Text style={{ fontSize: 18 }}>问题描述:</Text>
                  </View>
                  {issueimagePath.map((item, i) => {
                    return <Image key={i} style={styles.img} source={{ uri: URL + item }} resizeMethod={'resize'} />;
                  })}
                </View>
                <View style={styles.textStyle}>
                  <Text style={{ lineHeight: 28, fontSize: 16 }}> {iusseItem.description}</Text>
                </View>
              </View>
              {
                status === 1 ? <Text></Text> : (
                  imagePathReply.map((item, i) => {
                    return <View style={styles.viewWorps} key={i}>
                      <View style={styles.imgStyle}>
                        <View style={styles.issueStyle}>
                          <Text style={{ fontSize: 18 }}>整改描述:</Text>
                        </View>
                        {JSON.parse(item.imagePath).map((item, i) => {
                          return (
                            <Image
                              key={i}
                              style={styles.img}
                              source={{ uri: URL + item }}
                              resizeMethod={'resize'}
                            />
                          );
                        })}
                      </View>
                      <View style={styles.textStyle}>
                        <Text style={{ lineHeight: 28, fontSize: 16 }}> {item.content}</Text>
                      </View>
                    </View>
                  })
                )
              }
            </View>
            {whoseIusseReply.map((item, i) => {
              return (
                <View style={styles.OpinStyle} key={i}>
                  <View>
                    <Text style={{ fontSize: 18, marginRight: 10 }}>意见{i + 1}: </Text>
                  </View>
                  <View>
                    <Text style={styles.OpinionStyle}>{item.content}</Text>
                  </View>
                </View>
              );
            })}

            <View style={styles.butViewStyle}>
              {(status === 3 || status === 1 || (!sponsorId)) ? <Text></Text> : <Button
                title={t('screen.creatissu_disagree')}
                onPress={this.onpass.bind(this)}
                containerStyle={styles.butStyle}
              />}
              {
                (status === 3 || (!foremanId)) ? <Text></Text> : <Button
                  title={t('screen.statisticsDetails_rectification')}
                  disabled={this.state.disabled}
                  onPress={this.onperss.bind(this, buttonStatusText)}
                  containerStyle={styles.butStyle}
                />
              }
              {
                (status === 3 || status === 1 || (!sponsorId)) ? <Text></Text> : <Button
                  title={t('screen.statisticsDetails_confirm')}
                  disabled={this.state.disabled}
                  onPress={this.onperss.bind(this, buttonStatusText)}
                  containerStyle={styles.butStyle}
                />
              }
            </View>
            <Overlay
              isVisible={this.state.isVisible}
              windowBackgroundColor="rgba(0, 0, 0, .7)"
              overlayBackgroundColor="#fff"
            >
              <View>
                <Input
                  placeholder={t('screen.statisticsDetails_opinion')}
                  containerStyle={styles.modulStyle}
                  onChangeText={this.onChangeText.bind(this)}
                  shake={true}
                  multiline={true}
                />
                <Button
                  title={t('screen.statisticsDetails_submit')}
                  onPress={this.onVisible.bind(this)}
                />
              </View>
            </Overlay>
          </View>
        </ScrollView>
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
)(withLogin(StatisticsDetails));
