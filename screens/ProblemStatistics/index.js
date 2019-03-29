import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ListView,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  DeviceEventEmitter
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../services/redux/actions';
import { ListItem, Header, Button, Icon } from 'react-native-elements';
import statisticsStyle from './statisticsStyle';
import { t } from '../../services/i18n';
import { makeUUID } from '../../utils/uuid';
import statisticsDetails from '../statisticsDetails';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import * as titleConstants from '../../constants/titleConstants';
import TypeModal from './TypeModal';
import StatusModal from './StatusModal';
import ModalDropdown from 'react-native-modal-dropdown';
import InteractionModal from './InteractionModal';
import withLogin from '../../services/common/withLogin';
import moment from 'moment';

const styles = StyleSheet.create({ ...statisticsStyle });
class ProblemStatistics extends Component {
  constructor(props) {
    super(props);
    const showInteraction = this.shouldShowInteraction();
    const showCreateIssue = this.shouldShowCreateIssue();
    this.state = {
      showInteraction: showInteraction,
      showCreateIssue: showCreateIssue,
      type: 0,
      typenum: 0,
      status: 0,
      statusnum: 0,
      interaction: showInteraction ? 0 : 2,
      interactionnum: 0,
      page: 1,
      pageSize: 12,
      projectId: this.props.navigation.state.params ? this.props.navigation.state.params.id : 0,
      typeModalVisible: false,
      statusModalVisible: false,
      interactionModalVisible: false,
      issueStatus: false
    };
  }

  shouldShowInteraction = () => {
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
  };

  shouldShowCreateIssue = () => {
    let result = false;
    if (this.props.monitor.loginData) {
      this.props.monitor.loginData.roles.forEach(element => {
        const roleName = element.roleName;
        if (
          roleName === titleConstants.TITLE_PROJECT_DIRECTOR ||
          roleName === titleConstants.TITLE_PRODUCE_DIRECTOR ||
          roleName === titleConstants.TITLE_SECURITY_GUARD ||
          roleName === titleConstants.TITLE_QUALITY_INSPECTOR ||
          roleName === titleConstants.TITLE_MATERIAL_STAFF ||
          roleName === titleConstants.TITLE_CHIEF_INSPECTOR ||
          roleName === titleConstants.TITLE_SPECIALIZED_SUPERVISION_ENGINEER ||
          roleName === titleConstants.TITLE_OWNER_ENGINEER
        ) {
          result = true;
        }
      });
    }
    return result;
  };
  componentDidMount() {
    this.fetchData();
    this.listener = DeviceEventEmitter.addListener('xxxName', (msg) => {
      this.setState({
        issueStatus: msg
      })
    });
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
    console.log('this.state.projectId', this.state.projectId);
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

  typeOnSelect(i, v) {
    num = parseInt(i) + 1;
    this.setState({
      type: num,
      typenum: num,
    });
  }
  statusOnSelect(i, v) {
    num = parseInt(i) + 1;
    this.setState({
      status: num,
      statusnum: num,
    });
  }
  interactionOnSelect(i, v) {
    num = parseInt(i) + 1;
    this.setState({
      interaction: num,
      interactionnum: num,
    });
  }
  componentWillUnmount() {
    if (this.listener) {
      this.listener.remove();
    }
  }
  resetAll = () => {
    this.setState({
      interaction: 0,
      status: 0,
      type: 0,
      interactionnum: 0,
      statusnum: 0,
      typenum: 0
    });
  };

  _dropdown_2_renderRow(rowData, rowID, highlighted) {
    return (
      <TouchableOpacity >
        <View style={styles.dropdownPosition}>
          <Text style={styles.customtext}>
            {rowData}
          </Text>
        </View>
      </TouchableOpacity>
    );
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
    const typeOptions = [
      t('screen.problem_statistics_type_material'),
      t('screen.problem_statistics_type_quality'),
      t('screen.problem_statistics_type_security'),
      t('screen.problem_statistics_type_other'),
    ];
    const statusOptions = [
      t('screen.problem_statistics_status_wait_feedback'),
      t('screen.problem_statistics_status_wait_confirm'),
      t('screen.problem_statistics_status_already_confirmed'),
    ];
    const interactionOptions = [
      t('screen.problem_statistics_interaction_inner'),
      t('screen.problem_statistics_interaction_outer'),
    ];
    console.log('this', this);
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
      issueItemList.unshift(byId[id]);
    });
    issueItemList.map((item, i) => {
      item.createTime = moment(item.createTime)
        .local()
        .format('YYYY-MM-DD');
      return item
    })
    return (
      <View style={styles.worp}>
        <Header
          leftComponent={
            <View>
              <Text
                onPress={this.goback.bind(this, 'ProjectDetailsStack')}
                style={{ color: '#fff', fontSize: 18, marginLeft: 10 }}
              >
                {t('screen.header_return')}
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
          <ModalDropdown
            style={styles.modalDropdown}
            textStyle={styles.textStyle}
            defaultValue={typeMap.get(this.state.typenum)}
            dropdownStyle={styles.dropdownPosition}
            options={typeOptions}
            renderRow={this._dropdown_2_renderRow.bind(this)}
            onSelect={this.typeOnSelect.bind(this)}
          />

          <ModalDropdown
            style={styles.modalDropdown}
            textStyle={styles.textStyle}
            defaultValue={statusMap.get(this.state.statusnum)}
            dropdownStyle={styles.dropdownPosition}
            options={statusOptions}
            renderRow={this._dropdown_2_renderRow.bind(this)}
            onSelect={this.statusOnSelect.bind(this)}
          />
          {this.state.showInteraction ?
            <ModalDropdown
              style={styles.modalDropdown}
              textStyle={styles.textStyle}
              defaultValue={interactionMap.get(this.state.interactionnum)}
              dropdownStyle={styles.dropdownPosition}
              options={interactionOptions}
              renderRow={this._dropdown_2_renderRow.bind(this)}
              onSelect={this.interactionOnSelect.bind(this)}
            /> : <Button
              title={t('screen.problem_statistics_interaction_outer')}
              titleStyle={styles.arrStyle}
              disabled={true}
            />

          }

          {this.state.showInteraction ? this.state.type || this.state.status || this.state.interaction ? <Button
            title={t('screen.problem_statistics_button_reset_all')}
            containerStyle={styles.arrStyle}
            onPress={this.resetAll}
          /> : <Text /> : this.state.type || this.state.status ? <Button
            title={t('screen.problem_statistics_button_reset_all')}
            titleStyle={styles.arrStyle}
            onPress={this.resetAll}
          /> : <Text />


          }
          {this.state.showCreateIssue && (
            <Button
              title={t('screen.problem_statistics_button_jump_drawer')}
              titleStyle={styles.arrStyle}
              onPress={this.jump.bind(this)}
            />
          )}
        </View>
        <ScrollView onScroll={evt => this.scrollHandle(evt)} scrollEventThrottle={50}>
          <View>
            {issueItemList.map((item, i) => {
              return <ListItem
                key={i}
                title={item.name}
                rightIcon={{ name: 'chevron-right' }}
                containerStyle={styles.itemIssue}
                subtitle={
                  <View style={styles.ItemLists}>
                    <Text style={styles.ratingText1}>{item.createTime}</Text>
                    <Text style={styles.ratingText3}>{typeMap.get(item.type)}</Text>
                    <Text style={styles.ratingText2}>{interactionMap.get(item.interaction)}</Text>
                    <Text style={styles.ratingText}>{statusMap.get(item.status)}</Text>
                  </View>
                }
                onPress={this.submint.bind(this, item.interaction, item.type, item.status, item.id)}
              />
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
