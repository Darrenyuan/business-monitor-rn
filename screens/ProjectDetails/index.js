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
import { Cell, Section, TableView } from 'react-native-tableview-simple';

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
    const CellVariant = props => (
      <Cell
        {...props}
        cellContentView={
          <View style={{ alignItems: 'left', flexDirection: 'row', flex: 1, paddingVertical: 10 }}>
            <Text allowFontScaling numberOfLines={1} style={{ flex: 1, fontSize: 20 }}>
              {props.title}
            </Text>
            <Text allowFontScaling numberOfLines={1} style={{ flex: 1, fontSize: 20 }}>
              {props.title}
            </Text>
          </View>
        }
      />
    );
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
        <ScrollView bounces={true}>
          <TableView>
            <Section>
              <Cell
                cellStyle="Subtitle"
                title={t('screen.projectDetails_name')}
                detail={detailItem.name}
              />
              <Cell
                cellStyle="Subtitle"
                title={t('screen.projectDetails_date')}
                detail={timeStart + '-' + timeEnd}
              />
              <Cell
                cellStyle="Subtitle"
                title={t('screen.projectDetails_cost')}
                detail={detailItem.cost}
              />
              <Cell
                cellStyle="Subtitle"
                title={t('screen.projectDetails_site')}
                detail={detailItem.location}
              />
              <Cell
                cellStyle="Subtitle"
                title={t('screen.projectDetails_designUnit')}
                detail={detailItem.designUnit}
              />
              <Cell
                cellStyle="Subtitle"
                title={t('screen.projectDetails_supervisoryUnit')}
                detail={detailItem.monitorUnit}
              />
              <Cell
                cellStyle="Subtitle"
                title={t('screen.projectDetails_constructionUnit')}
                detail={detailItem.constructionUnit}
              />
              <Cell
                cellStyle="Subtitle"
                title={t('screen.projectDetails_overview')}
                detail={detailItem.overview}
              />
            </Section>
          </TableView>
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
