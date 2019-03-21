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
<<<<<<< 48b58fe58e897faa57f751d8766b9e2e5a2fab60

    this.state = {
      name: t('drawer.projects_details'),
      ProjectsDetails: '',
=======
    this.state = {
      name: t('drawer.projects_details'),
>>>>>>> i18n
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
<<<<<<< 48b58fe58e897faa57f751d8766b9e2e5a2fab60
    //TODO 修改lists
    let lists = [
      {
        '工程名称:': detailItem.name,
      },
      {
        '工期:': timeStart + '-' + timeEnd,
      },
      {
        '工程造价:': detailItem.cost,
      },
      {
        '工程地点:': detailItem.location,
      },
      {
        '工程概况:': detailItem.overview,
      },
      {
        '设计单位:': detailItem.designUnit,
      },
      {
        '监理单位:': detailItem.monitorUnit,
      },
      {
        '建设单位:': detailItem.constructionUnit,
      },
    ];
    const arr = [
      '工程名称:',
      '工期:',
      '工程造价:',
      '工程地点:',
      '工程概况:',
      '设计单位:',
      '监理单位:',
      '建设单位:',
    ];
=======
>>>>>>> i18n
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
<<<<<<< 48b58fe58e897faa57f751d8766b9e2e5a2fab60
                {t('screen.problem_statistics_header_left_component')}
=======
                {t('screen.header_return')}
>>>>>>> i18n
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
        <ScrollView>
<<<<<<< 48b58fe58e897faa57f751d8766b9e2e5a2fab60
          <View>
            {lists.map((item, i) => {
              return (
                <View key={i} style={styles.detailView}>
                  <Text style={styles.detailText}>{arr[i]}</Text>
                  <Text style={styles.detailColor}>{item[arr[i]]}</Text>
                </View>
              );
            })}
            <Button title={t('screen.creatissu_issue')} onPress={this.onperss.bind(this, id)} />
=======
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
>>>>>>> i18n
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
<<<<<<< 48b58fe58e897faa57f751d8766b9e2e5a2fab60
)(withLogin(ProjectsDetails));
=======
)(ProjectsDetails);
>>>>>>> i18n
