import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../services/redux/actions";
import { Button, Header, Icon } from 'react-native-elements';
import detailStyle from "./detailStyle"
const styles = StyleSheet.create({ ...detailStyle });

class Projects extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "工程详情信息"
    }
  }

  onperss(evss) {
    // this.props.actions.fetchIssueList({
    //   projectId: evss,
    //   page: 1,
    //   pageSize: 10,
    //   type: 0,
    //   status: 0,
    //   interaction: 0,
    // });
    this.props.navigation.navigate('ProblemStatisticsStack', {
      info: evss,
    });
  }

  goback(text) {
    this.props.navigation.navigate(text);
  }

  render() {
    console.log("this1", this);
    let id = this.props.navigation.state.params.info;
    let DetailId = this.props.monitor.projectList.byId[id];
    let d = new Date(DetailId.startTime);
    let dend = new Date(DetailId.endTime);
    let times = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    let timesend = dend.getFullYear() + '/' + (dend.getMonth() + 1) + '/' + dend.getDate();
    let lists = [
      {
        "工程名称:": DetailId.name
      },
      {
        "工期:": times + '-' + timesend
      },
      {
        "工程造价:": 1000
      },
      {
        "工程地点:": DetailId.location
      },
      {
        "工程概况:": DetailId.overview
      },
      {
        "设计单位:": DetailId.designUnit
      },
      {
        "监理单位:": DetailId.monitorUnit
      },
      {
        "建设单位:": DetailId.constructionUnit
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
    console.log('lists', lists);
    return (
      <View style={styles.worp}>
        <Header
          leftComponent={<View >
            <Text
              onPress={this.goback.bind(this, "projectsStack")}
              style={{ color: "#fff", fontSize: 18, marginLeft: 10 }}>返回</Text>
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
              title="工程问题信息"
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
)(Projects);