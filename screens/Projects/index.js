import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, ListView, RefreshControl } from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../services/redux/actions';
import { ListItem, Header, Icon, Button } from 'react-native-elements';
import projectStyle from './projectlistStyle';
import { t } from '../../services/i18n';
import withLogin from '../../services/common/withLogin';
import { toUnicode } from 'punycode';
import moment from 'moment';

const styles = StyleSheet.create({ ...projectStyle });

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: t('drawer.projects_list'),
      noMoreData: false,
      page: 1,
      pageSize: 8,
      projectItems: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: this._rowHasChanged.bind(this),
      }),
    };
    // this.state.dataSource = this.state.dataSource.cloneWithRows([], []);
  }
  componentDidMount() {
    this.props.actions.fetchProjectList({
      page: this.state.page,
      pageSize: this.state.pageSize,
    });
  }

  componentWillReceiveProps(nextProps) {
    // Trigger a re-render when receiving new props (when redux has more data).
    this.setState({
      dataSource: this.getUpdatedDataSource(nextProps),
    });
  }

  getUpdatedDataSource(props) {
    // See the ListView.DataSource documentation for more information on
    // how to properly structure your data depending on your use case.
    let items = { ...this.state.projectItems, ...props.monitor.projectList.byId };
    let ids = Object.keys(items);
    this.setState({ projectItems: items });
    return this.state.dataSource.cloneWithRows(items, ids);
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
    let page = this.state.page + num;
    if (page < 1) {
      page = 1;
    }
    this.props.actions.fetchProjectList({
      page: page,
      pageSize: this.state.pageSize,
    });
    this.setState({
      page: page,
    });
  }
  prevPage = () => {
    this.loadMoreData(-1);
  };
  nextPage = () => {
    this.loadMoreData(1);
  };
  _rowHasChanged(r1, r2) {
    // You might want to use a different comparison mechanism for performance.
    return JSON.stringify(r1) !== JSON.stringify(r2);
  }

  _fetchFirstPage = () => {
    this.setState({
      projectItems: {},
      page: 1,
    });
    this.props.actions.fetchProjectList({
      page: 1,
      pageSize: this.state.pageSize,
    });
  };
  _renderRefreshControl() {
    // Reload all data
    return (
      <RefreshControl
        refreshing={this.props.monitor.projectList.fetchProjectListPending}
        onRefresh={this._fetchFirstPage}
      />
    );
  }
  _canLoadMore = () => {
    const {
      page,
      pageSize,
      total,
      byId,
      items,
      fetchProjectListPending,
    } = this.props.monitor.projectList;
    const lastPage = total <= page * pageSize;

    if (!fetchProjectListPending && !lastPage) {
      return true;
    }
  };
  _onEndReached = () => {
    const {
      page,
      pageSize,
      total,
      byId,
      items,
      fetchProjectListPending,
    } = this.props.monitor.projectList;
    const lastPage = total <= page * pageSize;

    if (!fetchProjectListPending && !lastPage) {
      this.nextPage();
    }
  };
  render() {
    if (this.props.monitor.projectList.fetchProjectListPending) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }
    const loading = {
      type: 'Loading',
      loading: this.props.monitor.projectList.fetchProjectListPending,
    };
    // let rows = Object.values(this.props.monitor.projectList.byId);

    // let data = this.state.dataSource.cloneWithRows([...rows, loading]);
    return (
      <View>
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
        <View>
          <ListView
            renderScrollComponent={props => <InfiniteScrollView {...props} />}
            enableEmptySections={true}
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={(item, index) => {
              var start = moment.utc(item.startTime).toDate();
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
                  key={index}
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
            }}
            canLoadMore={this._canLoadMore}
            onLoadMoreAsync={this._onEndReached}
            // canLoadMore={() => {}}
            // onLoadMoreAsync={this._onEndReached}
            refreshControl={this._renderRefreshControl()}
            onEndReached={() => this._onEndReached()}
            onEndReachedThreshold={0}
          />
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
