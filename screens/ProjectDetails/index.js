import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../services/redux/actions";
import { Button, Header, Icon } from 'react-native-elements';
import detailStyle from "./detailStyle";
import { t } from '../../services/i18n';
const styles = StyleSheet.create({ ...detailStyle });

class ProjectsDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: t('drawer.projects_details')
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
    //TODO info 改为 id
    let id = this.props.navigation.state.params.id;
    let detailItem = this.props.monitor.projectList.byId[id];
    let startTime = new Date(detailItem.startTime);
    let endTime = new Date(detailItem.endTime);
    let timeStart = startTime.getFullYear() + '/' + (startTime.getMonth() + 1) + '/' + startTime.getDate();
    let timeEnd = endTime.getFullYear() + '/' + (endTime.getMonth() + 1) + '/' + endTime.getDate();
    //TODO 修改lists
    let lists = [
      {
        "工程名称:": detailItem.name
      },
      {
        "工期:": timeStart + '-' + timeEnd
      },
      {
        "工程造价:": detailItem.cost
      },
      {
        "工程地点:": detailItem.location
      },
      {
        "工程概况:": detailItem.overview
      },
      {
        "设计单位:": detailItem.designUnit
      },
      {
        "监理单位:": detailItem.monitorUnit
      },
      {
        "建设单位:": detailItem.constructionUnit
      }
    ];
    const arr = ["工程名称:", "工期:", "工程造价:", "工程地点:", "工程概况:", "设计单位:", "监理单位:", "建设单位:"]
    if (this.props.monitor.projectList.fetchProjectListPending) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.worp}>
        <Header
          leftComponent={<View >
            <Text
              onPress={this.goback.bind(this, "projectsStack")}
              style={{ color: "#fff", fontSize: 18, marginLeft: 10 }}>{t('screen.creatissu_return')}</Text>
          </View>}
          centerComponent={{ text: this.state.name, style: { color: '#fff', fontSize: 18 } }}
          rightComponent={<View >
            <Icon name="home" color="#fff" size={28}
              iconStyle={{ marginRight: 10 }}
              onPress={this.goback.bind(this, "projectsStack")}
            />

          </View>}
        />
        <ScrollView>
          <View>
            {
              lists.map((item, i) => {
                return <View key={i} style={styles.detailView}>
                  <Text style={styles.detailText}>{arr[i]}</Text>
                  <Text style={styles.detailColor}>{item[arr[i]]}</Text>
                </View>
              })
            }
            <Button
              title={t('screen.creatissu_issue')}
              onPress={this.onperss.bind(this, id)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    monitor: state
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsDetails);