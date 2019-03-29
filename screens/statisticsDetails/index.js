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
  TextInput,
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
      disabled: false,
      replyList: [],
      issueDetail: '',
      description: '',
      imageIndex: 1,
      status: this.props.navigation.state.params.status,
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
    this.setState({
      scrollX: 0,
      scrollY: 0,
    });
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
  }
  goback(text) {
    this.props.navigation.navigate(text);
  }
  //确认按钮
  onVisible(index) {
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
    } else if (index === 1) {
      this.setState({
        isVisible: true,
      });
    }
    //index等于0 已确认，跳转问题列表
    //index等于1 待反馈 ，给出意见，跳转问题列表
    //index等于2 取消，什么都不做，;
  }
  onSubmit() {
    apiCreateReply({
      issueId: this.props.navigation.state.params.issueId,
      username: this.props.monitor.loginData.username,
      content: this.state.description,
    }).then(res => {
      apiupdateIssueStatus({
        issueId: this.props.navigation.state.params.issueId,
        status: 1,
      });
      this.props.navigation.navigate('ProblemStatisticsStack', {
        id: this.props.navigation.state.params.projectId,
      });
    });
    DeviceEventEmitter.emit('xxxName', true);
    this.setState({
      isVisible: false,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation.state.params.issueId !== this.props.navigation.state.params.issueId ||
      prevProps.navigation.state.params.status !== this.props.navigation.state.params.status
    ) {
      this.fetchReply();
      this.issueDetail();
      this.fetchReplies();
    }
  }
  scrollHandle(event) {
    const scrollOffset = event.nativeEvent.contentOffset.y;
    if (scrollOffset < -100) {
      this.fetchReply();
      this.issueDetail();
      this.fetchReplies();
    }
  }
  handleShowView() {
    this.setState({ showView: true });
  }
  handleModelCancel = () => {
    this.setState({ modalVisible: false });
  };
  showImageView = () => {
    this.setState({ modalVisible: true });
  };
  //反馈按钮
  handleFeedBack() {
    this.props.navigation.navigate('createCommentStack', {
      issueId: this.props.navigation.state.params.issueId,
    });
  }
  handlefetch() {
    this.setState({
      scrollY: 600
    })
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
    let issueFeedBackList = [];
    let whoseIusseFeedBack = [];
    let whoseIusseReplies = [];
    let issueImagePath = [];
    let issueRepliesList = [];
    let historyIusseFeedBack = [];
    let sponsorId = false;
    let foremanId = false;
    let issueId = this.props.navigation.state.params.issueId;
    console.log('issueId', issueId);
    let userId = this.props.monitor.loginData.userId;
    let issueItem = this.state.issueDetail;
    let status = this.props.navigation.state.params.status;
    let feedBackList = this.props.monitor.replyList.byId;
    let repliesList = this.props.monitor.repliesList.byId;
    console.log('this', this);
    if (issueItem) {
      sponsorId = userId === issueItem.sponsorId ? true : false;
      foremanId = userId === issueItem.handlerId ? true : false;
    }
    if (issueItem.imagePath) {
      issueImagePath = JSON.parse(issueItem.imagePath);
    }
    if (feedBackList) {
      for (const key in feedBackList) {
        issueFeedBackList.unshift(feedBackList[key]);
      }
      console.log('issueFeedBackList', issueFeedBackList);
      whoseIusseFeedBack = issueFeedBackList.filter(item => {
        return item.issueId === issueId;
      });
      console.log('whoseIusseFeedBack', whoseIusseFeedBack);
      if (whoseIusseFeedBack.length !== 0) {
        whoseIusseFeedBack = whoseIusseFeedBack.map((item, i) => {
          let imagePath = [];
          let JsonImagePath = [];
          item.createTime = moment(item.createTime)
            .local()
            .format('YYYY-MM-DD hh:mm');
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
    console.log('whoseIusseFeedBack', whoseIusseFeedBack);
    let length;
    if (whoseIusseFeedBack && whoseIusseReplies) {
      length = whoseIusseFeedBack.length - whoseIusseReplies.length;
    }
    console.log('length', length);
    if ((status === 2 && length === 1) || status === 3) {
      let copy = JSON.parse(JSON.stringify(whoseIusseFeedBack))
      historyIusseFeedBack = copy.splice(1);
    } else if (status === 1 && length === 0) {
      historyIusseFeedBack = whoseIusseFeedBack;
    }

    console.log('whoseIusseFeedBack=>>>>>', whoseIusseFeedBack);
    console.log("historyimagePathReply", historyIusseFeedBack);
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
                  <Text style={{ fontSize: 16 }}>{t('screen.statisticsDetails_founder')}: {issueItem.sponsorName}</Text>
                </View>
                <View style={styles.time}>
                  <Text style={{ fontSize: 16 }}>{t('screen.statisticsDetails_creationTime')}: {localcreate}
                  </Text>
                </View>
                <View style={styles.peopel}>
                  <Text style={{ fontSize: 16 }}>{t('screen.createissue_modalDropdown1')}: {typeMap.get(issueItem.type)}</Text>
                </View>
                <View style={styles.time}>
                  <Text style={{ fontSize: 16 }}>{t('screen.problem_statistics_table_header_column2')}: {interactionMap.get(issueItem.interaction)}
                  </Text>
                </View>
                <View style={styles.peopel}>
                  <Text style={{ fontSize: 16 }}>{t('screen.problem_statistics_status_all')}: {statusMap.get(issueItem.status)}</Text>
                </View>
                <View style={styles.time}>
                  <Text style={{ fontSize: 16 }}>{t('screen.statisticsDetails_designatedProcessor')}: {issueItem.handlerName}</Text>
                </View>
                <View style={styles.fetchbutton}>
                  {//如果你是指定工长，才是反馈，status === 1 && foremanId ?
                    status === 1 && foremanId ? <Button
                      buttonStyle={styles.confirmbutton}
                      containerStyle={{ margin: 0, padding: 0 }}
                      title={t('screen.statisticsDetails_feedback')}
                      onPress={this.handleFeedBack.bind(this, t('screen.statisticsDetails_feedback'))}
                    /> : <Text />
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
                whoseIusseFeedBack.length === 0 && (<View style={styles.no}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {t('screen.statisticsDetails_questionFeedbackRecord')}
                  </Text>
                  <Text style={{ marginTop: (SCREEN_HEIGHT * 0.02), textAlign: "center" }}>
                    {t('screen.statisticsDetails_notAvailable')}
                  </Text>
                </View>)
              }
              {
                (whoseIusseFeedBack.length === 1 && whoseIusseReplies.length === 0) || (status === 2 && length === 1) || (status === 3 && whoseIusseFeedBack.length > 0) ? (<View style={styles.current}>
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {t('screen.statisticsDetails_questionFeedbackRecord')}
                    </Text>
                  </View>
                  <View style={styles.Detail}>
                    <View style={styles.name}>
                      <Text style={{ fontSize: 16 }}>{t('screen.statisticsDetails_feedbackStaff')}: {whoseIusseFeedBack[0].nickname}</Text>
                    </View>
                    <View style={styles.status}>
                      <Text style={{ fontSize: 16 }}>{t('screen.statisticsDetails_feedbackStatus')}: {statusMap.get(status)}
                      </Text>
                    </View>
                    <View style={styles.time}>
                      <Text style={{ fontSize: 16 }}>{t('screen.statisticsDetails_feedbackTime')}: {whoseIusseFeedBack[0].createTime}</Text>
                    </View>
                    <View style={styles.confirmbutton}>
                      {
                        status !== 2 || (!sponsorId) ? <Text></Text> : <Button
                          buttonStyle={{ width: SCREEN_WIDTH * 0.15, marginLeft: SCREEN_WIDTH * 0.15 }}
                          containerStyle={{ margin: 0, padding: 0 }}
                          title={t('screen.createssue_confirm')}
                          onPress={this.onperss.bind(this)}
                        />
                      }
                    </View>
                    {
                      whoseIusseFeedBack[0].imagePath.length === 0 ? <Text /> : <View style={styles.swiper}>
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
                              {whoseIusseFeedBack[0].imagePath.map((item, index) => {
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
                    }

                    <Modal
                      visible={this.state.modalVisible}
                      transparent={false}
                    >
                      <ImageViewer imageUrls={whoseIusseFeedBack[0].imagePath} enableSwipeDown onLongPress={this.handleModelCancel} onClick={this.handleModelCancel.bind(this)} />
                    </Modal>
                    <View style={styles.texts}>
                      <Text style={{ fontSize: 16 }}>
                        {whoseIusseFeedBack[0].content}
                      </Text>
                    </View>
                  </View>
                </View>) : <Text />
              }

              {
                (whoseIusseFeedBack.length === 1 && whoseIusseReplies.length === 1) || (status === 1 && length === 0) || (status === 2 && length === 1) || status === 3 ? (
                  <View style={styles.History}>
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        历史反馈记录
                      </Text>
                    </View>
                    {
                      historyIusseFeedBack.length !== 0 ? (historyIusseFeedBack.map((item, i) => {
                        return <View style={styles.Detail} key={i}>
                          <View style={styles.name}>
                            <Text style={{ fontSize: 16 }}>{t('screen.statisticsDetails_feedbackStaff')}: {item.nickname}</Text>
                          </View>
                          <View style={styles.status}>
                            <Text style={{ fontSize: 16 }}>{t('screen.statisticsDetails_feedbackStatus')}: {t('screen.statisticsDetails_notPass')}</Text>
                          </View>
                          <View style={styles.time}>
                            <Text style={{ fontSize: 16 }}>{t('screen.statisticsDetails_feedbackTime')}: {item.createTime}</Text>
                          </View>
                          {
                            whoseIusseReplies.length !== 0 ? <View style={styles.showView}>
                              <Text style={{ fontSize: 18, color: "red", lineHeight: SCREEN_HEIGHT * 0.05 }}> 原因: {whoseIusseReplies[i].content}</Text>
                            </View> : <Text />
                          }
                          {
                            item.imagePath.length === 0 ? <Text /> : <View style={styles.swiper}>
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
                          }

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
                      })) : <Text></Text>
                    }

                  </View>
                ) : <Text />
              }
            </View>
            <View>
              <ActionSheet
                ref={o => this.ActionSheet = o}
                title={t('screen.statisticsDetails_acknowledgmentFeedback')}
                options={[t('screen.statisticsDetails_resolved'), t('screen.statisticsDetails_Unsolved'), t('screen.logout_content_text2')]}
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
                    <TextInput
                      returnKeyType="done"
                      value={this.state.description}
                      onChangeText={description => this.setState({ description })}
                      placeholder={t('screen.statisticsDetails_opinion')}
                      placeholderTextColor={'#BBBBBB'}
                      underlineColorAndroid={'transparent'}
                      style={styles.modulStyle}
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
