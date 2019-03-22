import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../services/redux/actions";
import { ListItem, Header, Icon, Button } from 'react-native-elements';
import projectStyle from './projectlistStyle';
import { t } from '../../services/i18n';
import withLogin from '../../services/common/withLogin';
import { toUnicode } from "punycode";

const styles = StyleSheet.create({ ...projectStyle });

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: t('drawer.projects_list'),
      noMoreData: false,
      pageNumber: 1,
      projectList: {},
    };
  }
  componentDidMount() {
    this.props.actions.fetchProjectList({
      page: this.state.pageNumber,
      pageSize: 14,
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
      pageSize: 14,
    });
    this.setState({
      pageNumber: pageNumber,
    });
  }
  lastPage() {
    this.loadMoreData(-1);
  }
  nextPage() {
    this.loadMoreData(1);
  }
  scrollHandle(event) {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
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
      <View style={styles.wrap}>
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
        <ScrollView onScroll={evt => this.scrollHandle(evt)} scrollEventThrottle={50}>
          <View>
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
          </View>
        </ScrollView>
        <View style={styles.buttonViem}>
          <View style={styles.rightbut}>
            <Button
              title="上一页"
              containerStyle={styles.arrStyle}
              onPress={this.lastPage.bind(this)}
            />
          </View>
          <View style={styles.leftbut}>
            <Button
              title="下一页"
              containerStyle={styles.arrStyle}
              onPress={this.nextPage.bind(this)}
            />
          </View>
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
