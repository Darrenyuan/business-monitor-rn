import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Animated,
  DeviceEventEmitter,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../services/redux/actions';
import { ListItem, Header, Icon, Button } from 'react-native-elements';
import projectStyle from './projectlistStyle';
import { t } from '../../services/i18n';
import withLogin from '../../services/common/withLogin';
import moment from 'moment';
import { makeUUID } from '../../utils/uuid';

const styles = StyleSheet.create({ ...projectStyle });

const { height } = Dimensions.get('window');

const headerHeight = Header.height;
class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: t('drawer.projects_list'),
      noMoreData: false,
      page: 1,
      pageSize: 20,
      projectItems: {},
      screenHeight: 0,
      scrollY: new Animated.Value(headerHeight),
    };
    // this.state.dataSource = this.state.dataSource.cloneWithRows([], []);
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  componentDidMount() {
    this.props.actions.fetchProjectList({
      page: this.state.page,
      pageSize: this.state.pageSize,
    });
  }

  onpress(id) {
    this.props.navigation.navigate('ProjectDetailsStack', {
      id: id,
    });
  }
  goback(text) {
    this.props.navigation.navigate(text);
  }
  loadMoreData(num = 1) {
    if (this.props.monitor.projectList.fetchProjectListPending) {
      return;
    }
    if (this.state.page * this.state.pageSize >= this.props.monitor.projectList.total) {
      return;
    } else {
      let page = this.state.page + num;
      if (page < 1) {
        page = 1;
      }

      if (this.state.page * this.state.pageSize < this.props.monitor.projectList.total) {
        this.props.actions.fetchProjectList({
          page: this.state.page,
          pageSize: this.state.pageSize,
        });
        this.setState({
          page: page,
        });
        return;
      }
    }
  }

  render() {
    if (this.props.monitor.projectList.fetchProjectListPending) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }
    // if (!this.props.monitor.loginData) {
    //   this.props.navigation.navigate('loginStack');
    // }
    let projectList = [];
    let projectListById = this.props.monitor.projectList.byId;
    for (const key in projectListById) {
      projectList.push(projectListById[key]);
    }
    const scrollEnable = this.state.screenHeight > height;
    return (
      //TODO 修worp名字
      <View style={{ ...styles.worp, flex: 1 }}>
        <Header
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
        {Platform.OS === 'ios' ? (
          <ScrollView
            style={{ flex: 1 }}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
            ])}
            onMomentumScrollEnd={({ nativeEvent }) => {
              if (this.isCloseToBottom(nativeEvent)) {
                this.loadMoreData();
              }
            }}
          >
            <View>
              {projectList.map(item => {
                const keyString = makeUUID();
                {
                  let start = moment.utc(item.startTime).toDate();

                  var localStart = moment(start)
                    .local()
                    .format('YYYY/MM/DD');
                  var end = moment.utc(item.endTime).toDate();
                  var localEnd = moment(end)
                    .local()
                    .format('YYYY/MM/DD');
                  var renderText = localStart + '-' + localEnd;
                  return (
                    <ListItem
                      key={keyString}
                      title={item.name}
                      rightIcon={{ name: 'chevron-right' }}
                      containerStyle={styles.container}
                      subtitle={
                        <View style={styles.subtitleView}>
                          <Text style={styles.ratingText}>{renderText}</Text>
                        </View>
                      }
                      onPress={this.onpress.bind(this, item.id)}
                    />
                  );
                }
              })}
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            style={{ flex: 1 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              {
                listener: event => {
                  if (this.isCloseToBottom(event.nativeEvent)) {
                    this.loadMoreData();
                  }
                },
              },
            )}
          >
            <View>
              {projectList.map(item => {
                const keyString = makeUUID();
                console.log('key string:{}', keyString);
                var localStart = moment
                  .utc(item.startTime)
                  .local()
                  .format('YYYY/MM/DD');
                var end = moment.utc(item.endTime).toDate();
                var localEnd = moment(end)
                  .local()
                  .format('YYYY/MM/DD');
                var renderText = localStart + '-' + localEnd;
                {
                  return (
                    <ListItem
                      key={keyString}
                      title={item.name}
                      rightIcon={{ name: 'chevron-right' }}
                      containerStyle={styles.container}
                      subtitle={
                        <View style={styles.subtitleView}>
                          <Text style={styles.ratingText}>{renderText}</Text>
                        </View>
                      }
                      onPress={this.onpress.bind(this, item.id)}
                    />
                  );
                }
              })}
            </View>
          </ScrollView>
        )}
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
)(withLogin(Projects));
