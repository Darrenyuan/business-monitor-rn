import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../services/redux/actions';
import { Header, Button, Icon } from 'react-native-elements';
import statisticsStyle from './statisticsStyle';
import { t } from '../../services/i18n';
import { makeUUID } from '../../utils/uuid';
import statisticsDetails from '../statisticsDetails';
import * as titleConstants from '../../constants/titleConstants';
import TypeModal from './TypeModal';
import StatusModal from './StatusModal';
import InteractionModal from './InteractionModal';
import withLogin from '../../services/common/withLogin';

const styles = StyleSheet.create({ ...statisticsStyle });

class ProblemStatistics extends Component {
  constructor(props) {
    super(props);
    const showInteraction = this.shouldShowInteraction();
    this.state = {
      showInteraction: showInteraction,
      type: 0,
      status: 0,
      interaction: showInteraction ? 0 : 2,
      page: 1,
      pageSize: 12,
      projectId: this.props.navigation.state.params.id,
      typeModalVisible: false,
      statusModalVisible: false,
      interactionModalVisible: false,
    };
  }

  shouldShowInteraction() {
    let result = false;
    if (this.props.monitor.loginData) {
      this.props.monitor.loginData.roles.forEach(element => {
        const roleName = element.roleName;
        if (
          roleName === titleConstants.TITLE_ADMIN ||
          roleName === titleConstants.TITLE_PROJECT_MANAGER ||
          roleName === titleConstants.TITLE_LEADER ||
          roleName === titleConstants.TITLE_PROJECT_DIRECTOR ||
          roleName === titleConstants.TITLE_PRODUCE_DIRECTOR ||
          roleName === titleConstants.TITLE_PROFESSIONAL_FOREMAN ||
          roleName === titleConstants.TITLE_SECURITY_GUARD ||
          roleName === titleConstants.TITLE_QUALITY_INSPECTOR ||
          roleName === titleConstants.TITLE_MATERIAL_STAFF
        ) {
          result = true;
        }
      });
    }
    return result;
  }

  componentDidMount() {
    this.fetchData();
  }
  scrollHandle(event) {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const isEndReached = scrollOffset + scrollViewHeight >= contentHeight + 50;
    const isContentFillPage = contentHeight >= scrollViewHeight;
    if (this.state.page <= 1) {
      this.setState({
        page: 1,
      });

      if (scrollOffset < -50) {
        this.setState({
          page: this.state.page === 1 ? 1 : this.state.page - 1,
        });
      }
    }
    if (isContentFillPage && isEndReached) {
      this.setState({
        page: this.state.page + 1,
      });
    }
  }
  fetchData = () => {
    this.props.actions.fetchIssueList({
      page: this.state.page,
      pageSize: this.state.pageSize,
      projectId: this.state.projectId,
      type: this.state.type,
      status: this.state.status,
      interaction: this.state.interaction,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.projectId !== nextProps.navigation.state.params.id) {
      this.setState({
        projectId: this.props.navigation.state.params.id,
      });
      this.forceUpdate();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.navigation.state.params.id !== this.props.navigation.state.params.id ||
      prevState.page !== this.state.page ||
      prevState.pageSize !== this.state.pageSize ||
      prevState.projectId !== this.state.projectId ||
      prevState.type !== this.state.type ||
      prevState.status !== this.state.status ||
      prevState.interaction !== this.state.interaction ||
      prevState.issueStatus !== this.state.issueStatus
    ) {
      this.fetchData();
    }
  }

  submint(interaction, type, status, issueId) {
    this.props.navigation.navigate('statisticsDetailsStack', {
      interaction: interaction,
      type: type,
      status: status,
      issueId: issueId,
      projectId: this.state.projectId,
    });
    this.setState({
      issueStatus: false,
    });
  }
  scrollHandle(event) {
    const scrollOffset = event.nativeEvent.contentOffset.y;
    if (scrollOffset < -40) {
      this.fetchData();
    }
  }

  jump() {
    this.props.navigation.navigate('creatissuStack', {
      projectId: this.props.navigation.state.params.id,
    });
  }

  goback(text) {
    this.props.navigation.navigate(text);
  }

  handleTypeModalVisible = visible => {
    this.setState({ typeModalVisible: visible });
  };

  handleTypeModalValue = value => {
    this.setState({ type: value });
  };

  handleStatusModalVisible = visible => {
    this.setState({ statusModalVisible: visible });
  };

  handleStatusModalValue = value => {
    this.setState({ status: value });
  };

  handleInteractionModalVisible = visible => {
    this.setState({ interactionModalVisible: visible });
  };

  handleInteractionModalValue = value => {
    this.setState({ interaction: value });
  };

  resetAll = () => {
    this.setState({
      interaction: 0,
      status: 0,
      type: 0,
    });
  };
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
    if (this.props.monitor.issueList.fetchIssueListPending) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }
    byId = this.props.monitor.issueList.byId;
    items = this.props.monitor.issueList.items;

    const issueItemList = [];
    items.forEach(id => {
      issueItemList.push(byId[id]);
    });
    console.log('issueItemList', JSON.stringify(issueItemList));
    return (
      <View style={styles.worp}>
        <Header
          leftComponent={
            <View>
              <Text
                onPress={this.goback.bind(this, 'ProjectDetailsStack')}
                style={{ color: '#fff', fontSize: 18, marginLeft: 10 }}
              >
                {t('screen.problem_statistics_header_left_component')}
              </Text>
            </View>
          }
          centerComponent={{
            text: t('common:drawer.problem_statistics'),
            style: { color: '#fff', fontSize: 18 },
          }}
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
        <View style={styles.buttonViem}>
          <Button
            key={makeUUID()}
            containerStyle={styles.arrStyle}
            title={typeMap.get(this.state.type)}
            onPress={() => this.handleTypeModalVisible(true)}
          />
          <Button
            key={makeUUID()}
            containerStyle={styles.arrStyle}
            title={statusMap.get(this.state.status)}
            onPress={() => this.handleStatusModalVisible(true)}
          />
          <Button
            key={makeUUID()}
            containerStyle={styles.arrStyle}
            title={interactionMap.get(this.state.interaction)}
            onPress={() => this.handleInteractionModalVisible(true)}
          />
          <Button
            title={t('screen.problem_statistics_button_reset_all')}
            containerStyle={styles.arrStyle}
            onPress={this.resetAll}
          />
          <Button
            title={t('screen.problem_statistics_button_jump_drawer')}
            containerStyle={styles.arrStyle}
            onPress={this.jump.bind(this)}
          />
        </View>
        <TypeModal
          visible={this.state.typeModalVisible}
          handleTypeModalVisible={this.handleTypeModalVisible}
          handleTypeModalValue={this.handleTypeModalValue}
          typeMap={typeMap}
        />
        <StatusModal
          visible={this.state.statusModalVisible}
          handleStatusModalVisible={this.handleStatusModalVisible}
          handleStatusModalValue={this.handleStatusModalValue}
          statusMap={statusMap}
        />
        <InteractionModal
          visible={this.state.interactionModalVisible}
          handleInteractionModalVisible={this.handleInteractionModalVisible}
          handleInteractionModalValue={this.handleInteractionModalValue}
          interactionMap={interactionMap}
        />
        <View style={styles.headerNav}>
          <View key={makeUUID()} style={styles.listItem}>
            <Text style={styles.navText1}>
              {t('screen.problem_statistics_table_header_column1')}
            </Text>
          </View>
          <View key={makeUUID()} style={styles.listItem}>
            <Text style={styles.navText1}>
              {t('screen.problem_statistics_table_header_column2')}
            </Text>
          </View>
          <View key={makeUUID()} style={styles.listItem}>
            <Text style={styles.navText1}>
              {t('screen.problem_statistics_table_header_column3')}
            </Text>
          </View>
          <View key={makeUUID()} style={styles.listItem}>
            <Text style={styles.navText1}>
              {t('screen.problem_statistics_table_header_column4')}
            </Text>
          </View>
        </View>
        <ScrollView onScroll={evt => this.scrollHandle(evt)} scrollEventThrottle={50}>
          <View>
            {issueItemList.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={this.submint.bind(
                    this,
                    item.interaction,
                    item.type,
                    item.status,
                    item.id,
                  )}
                  style={styles.headerNav}
                >
                  <View style={styles.viewList}>
                    <Text style={styles.navText}>{item.name}</Text>
                  </View>
                  <View style={styles.viewList}>
                    <Text style={styles.navText}>{interactionMap.get(item.interaction)}</Text>
                  </View>
                  <View style={styles.viewList}>
                    <Text style={styles.typeText}>{typeMap.get(item.type)}</Text>
                  </View>
                  <View style={styles.viewList}>
                    <Text style={styles.statusText}>{statusMap.get(item.status)}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
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
)(withLogin(ProblemStatistics));
