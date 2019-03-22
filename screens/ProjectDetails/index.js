import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../services/redux/actions';
import { Button, Header, Icon } from 'react-native-elements';
import detailStyle from './detailStyle';
import { t } from '../../services/i18n';
import { apiFetchProject } from '../../services/axios/api';
import withLogin from '../../services/common/withLogin';

const styles = StyleSheet.create({ ...detailStyle });

class ProjectsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: t('drawer.projects_details'),
      ProjectsDetails: '',
    };
  }

  componentDidMount() {
    this.fetchProjectDetail();
  }
  fetchProjectDetail() {
    apiFetchProject({
      projectId: this.props.navigation.state.params.id,
    }).then(res => {
      this.setState({
        ProjectsDetails: res.data.data,
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.navigation.state.params.id !== this.props.navigation.state.params.id) {
      this.fetchProjectDetail();
    }
  }
  onperss(id) {
    this.props.navigation.navigate('ProblemStatisticsStack', {
      id: id,
    });
  }

  goback(text) {
    this.props.navigation.navigate(text);
  }

  render() {
    let id = this.props.navigation.state.params.id;
    let detailItem = this.state.ProjectsDetails;
    let startTime = new Date(detailItem.startTime);
    let endTime = new Date(detailItem.endTime);
    let timeStart =
      startTime.getFullYear() + '/' + (startTime.getMonth() + 1) + '/' + startTime.getDate();
    let timeEnd = endTime.getFullYear() + '/' + (endTime.getMonth() + 1) + '/' + endTime.getDate();
    if (this.props.monitor.projectList.fetchProjectListPending) {
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
                onPress={this.goback.bind(this, 'projectsStack')}
                style={{ color: '#fff', fontSize: 18, marginLeft: 10 }}
              >
                {t('screen.header_return')}
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
        <ScrollView
          bounces={true}
        >
          <View style={styles.detailView}>
            <Text style={styles.detailText}>{t('screen.projectDetails_name')}</Text>
            <Text style={styles.detailColor}>{detailItem.name}</Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailText}>{t('screen.projectDetails_date')}</Text>
            <Text style={styles.detailColor}>{timeStart + '-' + timeEnd}</Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailText}>{t('screen.projectDetails_cost')}</Text>
            <Text style={styles.detailColor}>{detailItem.cost}</Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailText}>{t('screen.projectDetails_site')}</Text>
            <Text style={styles.detailColor}>{detailItem.location}</Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailText}>{t('screen.projectDetails_overview')}</Text>
            <Text style={styles.detailColor}>{detailItem.overview}</Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailText}>{t('screen.projectDetails_designUnit')}</Text>
            <Text style={styles.detailColor}>{detailItem.designUnit}</Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailText}>{t('screen.projectDetails_supervisoryUnit')}</Text>
            <Text style={styles.detailColor}>{detailItem.monitorUnit}</Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailText}>{t('screen.projectDetails_constructionUnit')}</Text>
            <Text style={styles.detailColor}>{detailItem.constructionUnit}</Text>
          </View>
          <Button
            title={t('screen.projectDetails_issueInfo')}
            onPress={this.onperss.bind(this, id)}
          />
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLogin(ProjectsDetails));
