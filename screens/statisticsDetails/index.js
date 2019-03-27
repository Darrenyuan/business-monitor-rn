import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
  KeyboardAvoidingView,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Accordion from 'react-native-collapsible/Accordion';
import { bindActionCreators } from 'redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import { connect } from 'react-redux';
import * as actions from '../../services/redux/actions';
import Swiper from 'react-native-swiper';
import { Button, Header, Icon, Input, Overlay, } from 'react-native-elements';
import staDetStyle, { SCREEN_HEIGHT, SCREEN_WIDTH } from './staDetStyle';
import { t } from '../../services/i18n';
import { URL } from '../../services/axios/api';
import { apiCreateReply, apiupdateIssueStatus, apiIssueDetail } from '../../services/axios/api';
import withLogin from '../../services/common/withLogin';
import moment from 'moment';
const styles = StyleSheet.create({ ...staDetStyle });
class StatisticsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: t('drawer.statistics_details'),
      isVisible: false,
      texts: '',
      disabled: false,
      replyList: [],
      issueDetail: '',
      imageIndex: 1,
      status: 2,
      language: "",
      modalVisible: false,
      swiperShow: false,
      showView: false,
      activeSections: [],
      scrollX: 0,
      scrollY: 0,
    };
  }

  componentDidMount() {
    this.fetchReply();
    this.issueDetail();
    this.fetchReplies();
  }
  fetchReply() {
    this.props.actions.fetchReplyList({
      issueId: this.props.navigation.state.params.issueId,
    });
  }
  fetchReplies() {
    this.props.actions.fetchRepliesList({
      issueId: this.props.navigation.state.params.issueId,
    })
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

  onperss() {
    this.ActionSheet.show();
    // if (buttonStatusText === t('screen.statisticsDetails_rectification')) {
    //   this.props.navigation.navigate('createCommentStack', {
    //     issueId: this.props.navigation.state.params.issueId,
    //   });
    // } else {
    //   apiupdateIssueStatus({
    //     issueId: this.props.navigation.state.params.issueId,
    //     status: 3,
    //   }).then(res => {
    //     this.props.navigation.navigate('ProblemStatisticsStack', {
    //       id: this.props.navigation.state.params.projectId,
    //       issueStatus: 1,
    //     });
    //     this.setState({
    //       status: 3,
    //     });
    //     DeviceEventEmitter.emit('xxxName', true);
    //   });
    // }
  }
  goback(text) {
    this.props.navigation.navigate(text);
  }
  onChangeText(tex) {
    this.setState({
      texts: tex,
    });
  }
  //确认按钮
  onVisible(index) {
    console.log('index', index);
    if (index === 0) {
      apiupdateIssueStatus({
        issueId: this.props.navigation.state.params.issueId,
        status: 3,
      }).then(res => {
        this.props.navigation.navigate('ProblemStatisticsStack', {
          id: this.props.navigation.state.params.projectId,
          issueStatus: 1,
        });
        this.setState({
          status: 3,
        });
        DeviceEventEmitter.emit('xxxName', true);
      });
      console.log('=>>>>>>>>>>>>>>>>>>>>确认了');
    } else if (index === 1) {
      console.log('==>>>>>>>>>>>>>>不通过，继续反馈');
      this.setState({
        isVisible: true,
      });
    }
    //index等于0 已确认，跳转问题列表
    //index等于1 待反馈 ，给出意见，跳转问题列表
    //index等于2 取消，什么都不做，
    // apiCreateReply({
    //   issueId: this.props.navigation.state.params.issueId,
    //   username: this.props.monitor.loginData.username,
    //   content: this.state.texts,
    // }).then(res => {
    //   apiupdateIssueStatus({
    //     issueId: this.props.navigation.state.params.issueId,
    //     status: 1,
    //   });
    //   this.props.navigation.navigate('ProblemStatisticsStack', {
    //     id: this.props.navigation.state.params.projectId,
    //   });
    // });
  }
  onSubmit() {
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
    console.log('==>>>>提交了意见');
    this.setState({
      isVisible: false,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation.state.params.issueId !== this.props.navigation.state.params.issueId) {
      this.fetchReply();
      this.issueDetail();
      this.fetchReplies();
    }
  }
  scrollHandle(event) {
    const scrollOffset = event.nativeEvent.contentOffset.y;
    if (scrollOffset < -50) {
      this.fetchReply();
      this.fetchReplies();
    }
  }
  handleShowView(commentId) {
    this.setState({ showView: true });
    console.log('commentId', commentId);
  }
  handleModelCancel = () => {
    this.setState({ modalVisible: false });
  };
  showImageView = () => {
    this.setState({ modalVisible: true });
  };
  //反馈按钮
  handleFeedBack(feedBackButtonText) {
    if (feedBackButtonText === "查看反馈记录") {
      this.setState({
        scrollY: 600
      })
    } else {
      this.props.navigation.navigate('createCommentStack', {
        issueId: this.props.navigation.state.params.issueId,
      });
    }
  }
  render() {
    const typeMap = new Map();
    typeMap.set(0, t('screen.problem_statistics_type_all'));
    typeMap.set(1, t('screen.problem_statistics_type_material'));
    typeMap.set(2, t('screen.problem_statistics_type_quality'));
    typeMap.set(3, t('screen.problem_statistics_type_security'));
    typeMap.set(4, t('screen.problem_statistics_type_other'));
    const statusMap = new Map();
    statusMap.set(0, t('screen.problem_statistics_status_all'));
    statusMap.set(1, t('screen.problem_statistics_status_wait_feedback'));
    statusMap.set(2, t('screen.problem_statistics_status_wait_confirm'));
    statusMap.set(3, t('screen.problem_statistics_status_already_confirmed'));
    const interactionMap = new Map();
    interactionMap.set(0, t('screen.problem_statistics_interaction_all'));
    interactionMap.set(1, t('screen.problem_statistics_interaction_inner'));
    interactionMap.set(2, t('screen.problem_statistics_interaction_outer'));
    let issueReplyList = [];
    let whoseIusseReply = [];
    let whoseIusseReplies = [];
    let imagePathReply = [];
    let issueImagePath = [];
    let issueRepliesList = [];
    let sponsorId = false;
    let foremanId = false;
    let issueId = this.props.navigation.state.params.issueId;
    let roleId = this.props.monitor.loginData.roles[0].roleId;
    let issueItem = this.state.issueDetail;
    let status = this.props.navigation.state.params.status;
    console.log('status', status);
    let replyList = this.props.monitor.replyList.byId;
    let repliesList = this.props.monitor.repliesList.byId;
    console.log('this', this);
    if (issueItem.imagePath) {
      issueImagePath = JSON.parse(issueItem.imagePath);
    }
    console.log('issueImagePath', issueImagePath);
    if (replyList) {
      for (const key in replyList) {
        issueReplyList.unshift(replyList[key]);
      }
      console.log('issueReplyList', issueReplyList);
      whoseIusseReply = issueReplyList.filter(item => {
        return item.issueId === issueId;
      });
      console.log('whoseIusseReply', whoseIusseReply);
      if (whoseIusseReply.length !== 0) {
        whoseIusseReply = whoseIusseReply.map((item, i) => {
          let imagePath = [];
          let JsonImagePath = [];
          item.createTime = moment(item.createTime)
            .local()
            .format('YYYY-MM-DD hh:mm');
          console.log('item.imagePath', typeof item.imagePath);
          if (typeof (item.imagePath) === "string") {
            JsonImagePath = JSON.parse(item.imagePath);
            JsonImagePath.forEach(path => {
              imagePath.push({ url: `${URL}?path=${path}&width=862&height=812` });
            });
            item.imagePath = imagePath;
          }
          return item
        })
      }
    }
    if (repliesList) {
      for (const key in repliesList) {
        issueRepliesList.unshift(repliesList[key]);
      }
      whoseIusseReplies = issueRepliesList.filter(item => {
        return item.issueId === issueId;
      });
    }
    console.log('issueRepliesList', issueRepliesList);
    console.log('whoseIusseReplies', whoseIusseReplies);
    console.log('imagePathReply', whoseIusseReply);
    let historyimagePathReply = whoseIusseReply.splice(1);
    console.log('imagePathReply=>>>>>', whoseIusseReply);
    console.log("historyimagePathReply", historyimagePathReply);
    const paths = [];
    if (issueItem.imagePath) {
      issueImagePath.forEach(path => {
        paths.push({ url: `${URL}?path=${path}&width=862&height=812` });
      });
    }
    console.log("paths", paths);
    var create = moment.utc(issueItem.createTime).toDate();
    var localcreate = moment(create)
      .local()
      .format('YYYY-MM-DD hh:mm');
    sponsorId = roleId === issueItem.sponsorId ? true : false;
    foremanId = roleId === issueItem.handlerId ? true : false;
    feedBackButton = foremanId ? t('screen.statisticsDetails_feedback') : "查看反馈记录"
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
        <View>
          <ScrollView
            contentOffset={{ x: this.state.scrollX, y: this.state.scrollY }}
            onScroll={evt => this.scrollHandle(evt)} scrollEventThrottle={50}
          >
            <View style={styles.contenter} >
              <View style={styles.title}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{issueItem.name}</Text>
              </View>
              <View style={styles.Detail}>
                <View style={styles.peopel}>
                  <Text style={{ fontSize: 16 }}>创建人: {issueItem.sponsorName}</Text>
                </View>
                <View style={styles.time}>
                  <Text style={{ fontSize: 16 }}>创建时间: {localcreate}
                  </Text>
                </View>
                <View style={styles.peopel}>
                  <Text style={{ fontSize: 16 }}>问题类型: {typeMap.get(issueItem.type)}</Text>
                </View>
                <View style={styles.time}>
                  <Text style={{ fontSize: 16 }}>交互类型: {interactionMap.get(issueItem.interaction)}
                  </Text>
                </View>
                <View style={styles.peopel}>
                  <Text style={{ fontSize: 16 }}>当前状态: {statusMap.get(issueItem.status)}</Text>
                </View>
                <View style={styles.fetchbutton}>
                  {//如果你是指定工长，才是反馈，
                    foremanId && <Button
                      buttonStyle={styles.confirmbutton}
                      containerStyle={{ margin: 0, padding: 0 }}
                      title={feedBackButton}
                      onPress={this.handleFeedBack.bind(this, feedBackButton)}
                    />
                    //foremanId ? t('screen.statisticsDetails_feedback') : "查看反馈记录"
                  }
                </View>
              </View>
              <TouchableOpacity onPress={this.showImageView}>
                <View style={styles.swiper1}>
                  {paths.length !== 0 ? <Swiper

                    showsPagination={true}
                    dotColor="white"
                    horizontal={true}

                    loop={true}
                    style={{ flex: 1 }}
                    paginationStyle={{ bottom: 10 }}
                  >
                    {paths.map((item, index) => {
                      return (
                        <Image
                          style={styles.swiperImage}
                          key={index}
                          resizeMode="cover"
                          source={{ uri: item.url }}
                        />
                      );
                    })}
                  </Swiper> : <Text></Text>}
                </View>
              </TouchableOpacity>
              <View style={styles.texts}>
                <Text style={{ fontSize: 16 }}>
                  {issueItem.description}
                </Text>
              </View>
            </View>
            <View style={styles.issue}>
              {
                whoseIusseReply.length === 0 ? (<View style={styles.no}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    问题反馈记录
                </Text>
                  <Text style={{ marginTop: (SCREEN_HEIGHT * 0.02), textAlign: "center" }}>
                    暂无
                </Text>
                </View>) : (<View style={styles.current}>
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      问题反馈记录
                  </Text>
                  </View>
                  <View style={styles.Detail}>
                    <View style={styles.name}>
                      <Text style={{ fontSize: 16 }}>反馈人员: {whoseIusseReply[0].username}</Text>
                    </View>
                    <View style={styles.status}>
                      <Text style={{ fontSize: 16 }}>反馈状态: {statusMap.get(status)}
                      </Text>
                    </View>
                    <View style={styles.time}>
                      <Text style={{ fontSize: 16 }}>反馈时间: {whoseIusseReply[0].createTime}</Text>
                    </View>
                    <View style={styles.confirmbutton}>
                      {

                        status === 3 || (!sponsorId) ? <Text></Text> : <Button
                          buttonStyle={{ width: SCREEN_WIDTH * 0.15, marginLeft: SCREEN_WIDTH * 0.15 }}
                          containerStyle={{ margin: 0, padding: 0 }}
                          title={t('screen.createssue_confirm')}
                          onPress={this.onperss.bind(this)}
                        />
                      }
                    </View>
                    <View style={styles.swiper}>
                      <TouchableOpacity onPress={this.showImageView}>
                        <View style={styles.swiper1}>
                          <Swiper
                            showsPagination={true}
                            dotColor="white"
                            horizontal={true}
                            loop={true}
                            style={{ flex: 1 }}
                            paginationStyle={{ bottom: 10 }}
                          >
                            {whoseIusseReply[0].imagePath.map((item, index) => {
                              return (
                                <Image
                                  style={styles.swiperImage}
                                  key={index}
                                  resizeMode="cover"
                                  source={{ uri: item.url }}
                                />
                              );
                            })}
                          </Swiper>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Modal
                      visible={this.state.modalVisible}
                      transparent={false}
                    >
                      <ImageViewer imageUrls={whoseIusseReply[0].imagePath} enableSwipeDown onLongPress={this.handleModelCancel} onClick={this.handleModelCancel.bind(this)} />
                    </Modal>
                    <View style={styles.texts}>
                      <Text style={{ fontSize: 16 }}>
                        {whoseIusseReply[0].content}
                      </Text>
                    </View>
                  </View>
                </View>)
              }

              {
                whoseIusseReply.length === 1 && status === 1 ? <Text /> : (

                  historyimagePathReply.length !== 0 ? (historyimagePathReply.map((item, i) => {
                    return <View style={styles.History} key={i}>
                      <View>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          历史反馈记录
                      </Text>
                      </View>
                      <View style={styles.Detail}>
                        <View style={styles.name}>
                          <Text style={{ fontSize: 16 }}>反馈人员: {item.nickname}</Text>
                        </View>
                        <View style={styles.status}>
                          <Text style={{ fontSize: 16 }}>反馈状态: 不通过</Text>
                        </View>
                        <View style={styles.time}>
                          <Text style={{ fontSize: 16 }}>反馈时间: {item.createTime}</Text>
                        </View>
                        {
                          whoseIusseReplies.length !== 0 ? <View style={styles.showView}>
                            <Text style={{ fontSize: 18, color: "red", lineHeight: SCREEN_HEIGHT * 0.05 }}> 原因: {whoseIusseReplies[i].content}</Text>
                          </View> : <Text />
                        }

                        <View style={styles.swiper}>
                          <TouchableOpacity onPress={this.showImageView}>
                            <View style={styles.swiper1}>
                              <Swiper
                                showsPagination={true}
                                dotColor="white"
                                horizontal={true}
                                loop={true}
                                style={{ flex: 1 }}
                                paginationStyle={{ bottom: 10 }}
                              >
                                {item.imagePath.map((item, index) => {
                                  return (
                                    <Image
                                      style={styles.swiperImage}
                                      key={index}
                                      resizeMode="cover"
                                      source={{ uri: item.url }}
                                    />
                                  );
                                })}
                              </Swiper>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <Modal
                          visible={this.state.modalVisible}
                          transparent={false}
                          onRequestClose={() => this.handleModelCancel()}
                        >
                          <ImageViewer imageUrls={item.imagePath} enableSwipeDown onLongPress={this.handleModelCancel} onClick={this.handleModelCancel.bind(this)} />
                        </Modal>
                        <View style={styles.texts}>
                          <Text style={{ fontSize: 16 }}>
                            {item.content}
                          </Text>
                        </View>
                      </View>
                    </View>
                  })) : <Text></Text>
                )
              }
            </View>
            <View>
              <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'确认您反馈的问题已经被完全解决?'}
                options={['已彻底解决', '未完全解决，继续反馈', '取消']}
                cancelButtonIndex={2}
                destructiveButtonIndex={1}
                onPress={this.onVisible.bind(this)}
              />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
              <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
                      onPress={this.onSubmit.bind(this)}
                    />
                  </View>
                </Overlay>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

            {paths.length !== 0 ? <Modal
              visible={this.state.modalVisible}
              transparent={false}
              onRequestClose={() => this.handleModelCancel()}
            >
              <ImageViewer imageUrls={paths} enableSwipeDown onLongPress={this.handleModelCancel} onClick={this.handleModelCancel.bind(this)} />
            </Modal> : <Text />}

          </ScrollView>
        </View>
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
