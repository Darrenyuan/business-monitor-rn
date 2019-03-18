import React, { Component } from "react";
import {
  ScrollView, Text, View, StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../services/redux/actions";
import { Header, Button, Icon } from 'react-native-elements';
import statisticsStyle from './statisticsStyle';
import doFilter from './screen';
const styles = StyleSheet.create({ ...statisticsStyle });

class ProblemStatistics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "问题统计列表",
      showModal: false,
      disabled: [false, false, false],
      selectedIndex: 2,
      buttons: "交互",
      button1: "交互",
      button2: "分类",
      button3: "状态",
    }
  }

  componentDidMount() {
    let name = this.props.monitor.loginData.roles[0].roleName;
    if (name === "pojectDirector" || name === "ownerEngineer" || name === "specializedSupervisionEngineer") {
      this.setState({
        disabled: [true, false, false],
        button1: "外部",
      })
    }
    let id = this.props.navigation.state.params.info;
    console.log("idssssss", id);
    this.props.actions.fetchIssueList({
      page: 1,
      pageSize: 10,
      projectId: id,
      type: 0,
      status: 0,
      interaction: 0,
    })

  }
  componentWillReceiveProps(nextPoprs) {
    let id = this.props.navigation.state.params.info;
    console.log('idcc', id);
    // nextPoprs.actions.fetchIssueList({
    //   page: 1,
    //   pageSize: 10,
    //   proiectId: id,
    //   type: this.state.button2,
    //   status: this.state.button3,
    //   interaction: this.state.button1,
    // })
  }
  onpress(evss) {
    if (evss === "内部" || evss === "外部") {
      this.setState({
        button1: evss,
        showModal: false
      })
    } else if (evss === "材料" || evss === "质量" || evss === "安全" || evss === "其他") {
      this.setState({
        button2: evss,
        showModal: false
      })
    } else {
      this.setState({
        button3: evss,
        showModal: false
      })
    }
  }
  updateIndex(bs) {
    if (bs)
      console.log("sss", bs);
    this.setState({
      showModal: true,
      buttons: bs
    })
  }
  submint(interaction, type, status, id) {

    this.props.navigation.navigate('statisticsDetailsStack', {
      interaction: interaction,
      type: type,
      status: status,
      id: id,
    });
    console.log("状态传过来", interaction, type, status)
  }
  jump() {
    this.props.navigation.navigate('creatissuStack');
  }
  goback(text) {
    this.props.navigation.navigate(text);
  }
  render() {
    let buttonText;
    let oBx = this.state.buttons;
    let but1 = this.state.button1, but2 = this.state.button2, but3 = this.state.button3;
    let but = [but1, but2, but3];
    let Nav = ["名称", "交互", "分类", "状态"];
    if (oBx === "内部" || oBx === "外部" || oBx === "交互") {
      buttonText = ["内部", "外部"]
    } else if (oBx === "材料" || oBx === "质量" || oBx === "安全" || oBx === "其他" || oBx === "分类") {
      buttonText = ["材料", "质量", "安全", "其他"]
    } else {
      buttonText = ["待反馈", "待确认", "已确认"]
    }
    console.log('this.isint', this);
    if (this.props.monitor.projectList.fetchProjectListPending) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      )
    }
    let products = [{
      name: "问题啊啊1",
      interaction: "内部",
      type: "材料",
      status: "待确认",
      id: 1,
    },
    {
      name: "问题问题2",
      interaction: "内部",
      type: "质量",
      status: "待反馈",
      id: 2,
    },
    {
      name: "问题问题3",
      interaction: "内部",
      type: "安全",
      status: "已确认",
      id: 3,
    },
    {
      name: "问题问题4",
      interaction: "内部",
      type: "其他",
      status: "待确认",
      id: 4,
    },
    {
      name: "问题问题5",
      interaction: "外部",
      type: "材料",
      status: "待反馈",
      id: 5,
    },
    {
      name: "问题问题6",
      interaction: "外部",
      type: "安全",
      status: "已确认",
      id: 6,
    },
    {
      name: "问题问题7",
      interaction: "外部",
      type: "质量",
      status: "待反馈",
      id: 7,
    },
    {
      name: "问题问题8",
      interaction: "外部",
      type: "质量",
      status: "待反馈",
      id: 8,
    },
    {
      name: "问题问题9",
      interaction: "外部",
      type: "质量",
      status: "待确认",
      id: 9,
    },
    {
      name: "问题问题10",
      interaction: "外部",
      type: "其他",
      status: "已确认",
      id: 10,
    }
    ];
    let conditions = {
      ranges: [
        {
          type: 'interaction',
          value: but1
        }
      ],
      chooses: [
        {
          type: 'type',
          value: but2
        }
      ],
      statuss: [
        {
          type: 'status',
          value: but3
        }
      ]
    }
    let result = doFilter(products, conditions);
    result = result.length ? result : products;
    let lists = [];
    let listss = this.props.monitor.issueList.byId;
    for (const key in listss) {
      lists.push(listss[key]);
    }
    return (
      <View style={styles.worp}>
        <Header
          leftComponent={<View >
            <Text
              onPress={this.goback.bind(this, "ProjectDetailsStack")}
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
        <View style={styles.buttonViem}>
          {
            but.map((item, i) => {
              return <Button
                key={i}
                containerStyle={styles.arrStyle}
                title={item}
                disabled={this.state.disabled[i]}
                onPress={this.updateIndex.bind(this, item)}
              />
            })
          }
          <Button
            title="创建问题"
            containerStyle={styles.arrStyle}
            onPress={this.jump.bind(this)}
          />
        </View>
        <Modal
          visible={this.state.showModal}
          transparent={true}
          animationType='fade'
          onRequestClose={() => { }}
          style={{ flex: 1 }}
          ref="modal"  >
          <TouchableWithoutFeedback onPress={() => { this.setState({ showModal: false }) }} >
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', }} >
              <TouchableWithoutFeedback onPress={() => { this.setState({ showModal: false }) }}>
                <View style={styles.boxView}>
                  <View style={styles.courseWrap}>
                    {
                      buttonText.map((item, i) => {
                        return <TouchableOpacity key={i} onPress={this.onpress.bind(this, item)}>
                          <View style={{ padding: 10 }}>
                            <Text style={styles.textstyle}>{item}</Text>
                          </View>
                        </TouchableOpacity>
                      })
                    }
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={styles.headerNav}>
          {
            Nav.map((item, i) => {
              return <View key={i} style={styles.listItem}>
                <Text style={styles.navText1}>
                  {item}
                </Text>
              </View>
            })
          }
        </View>
        <ScrollView>
          <View>
            {
              result.map((item, i) => {
                return <TouchableOpacity key={i}
                  onPress={this.submint.bind(this, item.interaction, item.type, item.status, item.id)} style={styles.headerNav}>
                  <View style={styles.viewList}>
                    <Text style={styles.navText}>
                      {item.name}
                    </Text>
                  </View >
                  <View style={styles.viewList}>
                    <Text style={styles.navText}>
                      {item.interaction}
                    </Text>
                  </View>
                  <View style={styles.viewList}>
                    <Text style={styles.typeText}>
                      {item.type}
                    </Text>
                  </View>
                  <View style={styles.viewList}>
                    <Text style={styles.statusText}>
                      {item.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              })
            }

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
)(ProblemStatistics);
