import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../services/redux/actions";
import { ListItem, Header, Icon } from 'react-native-elements';
import projectStyle from './projectlistStyle';
import { t } from '../../services/i18n';
import withLogin from '../../services/common/withLogin';
import { toUnicode } from "punycode";

const styles = StyleSheet.create({ ...projectStyle });

class Projects extends Component {
  constructor(props) {
    super(props);
    //TODO t函数
    this.state = {
      name: t('drawer.projects_list'),
      noMoreData: false,
      pageNumber: 1,
      projectList: {},
    };
  }
  //TODO 上划加载
  componentDidMount() {
    this.props.actions.fetchProjectList({
      page: this.state.pageNumber,
      pageSize: 10,
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
  loadMoreData(num) {
    let pageNumber = this.state.pageNumber + num;
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    this.props.actions.fetchProjectList({
      page: pageNumber,
      pageSize: 10,
    });
    this.setState({
      pageNumber: pageNumber,
    });
  }
  scrollHandle(event) {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    console.log('scrollOffset', scrollOffset);
    console.log('scrollViewHeight', scrollViewHeight);
    console.log('contentHeight', contentHeight);
    const isEndReached = scrollOffset + scrollViewHeight >= contentHeight + 50;
    const isContentFillPage = contentHeight >= scrollViewHeight;
    if (this.state.pageNumber !== 1) {
      if (scrollOffset < -30) {
        this.loadMoreData(-1);
      }
    }
    if (isContentFillPage && isEndReached) {
      this.loadMoreData(1);
    }
  }

  ScrollEndDrag(e) {
    console.log(1111111111111111111111111111111);
  }
  ScrollBeginDrag(e) {
    console.log(22222222222222222222222222);
  }
  render() {
    if (this.props.monitor.projectList.fetchProjectListPending) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }
    let projectList = [];
    let projectListById = this.props.monitor.projectList.byId;
    for (const key in projectListById) {
      projectList.push(projectListById[key]);
    }
    return (
      //TODO 修worp名字
      <View style={styles.worp}>
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
        <View style={{ flex: 1 }}>
          <ScrollView
            onScrollBeginDrag={this.ScrollBeginDrag.bind(this)}
            onScrollEndDrag={this.ScrollEndDrag.bind(this)}
            showsVerticalScrollIndicator={true}
            canCancelContentTouches={true}
            bounces={true}
            contentContainerStyle={{ flexGrow: 1 }}
            nestedScrollEnabled={true}
            onScroll={evt => this.scrollHandle(evt)} scrollEventThrottle={50}>
            {projectList.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  title={item.name}
                  rightIcon={{ name: 'chevron-right' }}
                  containerStyle={styles.container}
                  onPress={this.onpress.bind(this, item.id)}
                />
              );
            })}
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
)(withLogin(Projects));
