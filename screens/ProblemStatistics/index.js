import React, { Component } from "react";
import {
  ScrollView, Text, View, StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  DeviceEventEmitter
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../services/redux/actions";
import { Header, Button, Icon } from 'react-native-elements';
import statisticsStyle from './statisticsStyle';
import { t } from '../../services/i18n';
import { apiFetchIssueList } from "../../services/axios/api";
import statisticsDetails from "../statisticsDetails"
const styles = StyleSheet.create({ ...statisticsStyle });
const typeMap = {
  1: "材料",
  2: "质量",
}
const statusMap = {

}

class ProblemStatistics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: t('drawer.problem_statistics'),
      showModal: false,
      disabled: [false, false, false],
      buttons: t('screen.creatissu_modalDropdown3'),
      button1: t('screen.creatissu_modalDropdown3'),
      button2: t('screen.creatissu_modalDropdown1'),
      button3: t('screen.creatissu_modalDropdown4'),
      issueStatus: false,
      type: 0,
      status: 0,
      interaction: 0,
      page: 1,
      pageSize: 10,
      projectId: this.props.navigation.state.params.id,
    }
  }

  componentDidMount() {
    let name = this.props.monitor.loginData.roles[0].roleName;
    if (name === "pojectDirector" ||
      name === "ownerEngineer" ||
      name === "specializedSupervisionEngineer") {
      this.setState({
        disabled: [true, false, false],
        button1: t('screen.creatissu_modalDropdown3_item2'),
      })
    }
    let id = this.props.navigation.state.params.id;
    this.fetchData();
    this.listener = DeviceEventEmitter.addListener('xxxName', (res) => {
      this.setState({
        issueStatus: res
      });
    });
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
  componentWillReceiveProps(nextPops) {
    this.setState({
      projectId: this.props.navigation.state.params.id,
      issueStatus: this.props.navigation.state.params.issueStatus,

    })
    this.forceUpdate();
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
  componentWillUnmount() {
    this.listener.remove();
  }
  onpress(evss) {
    if (evss === t('screen.creatissu_modalDropdown3_item1') ||
      evss === t('screen.creatissu_modalDropdown3_item2')) {
      if (evss === t('screen.creatissu_modalDropdown3_item1')) {
        this.setState({
          showModal: false,
          interaction: 1,
          button1: evss
        });
      } else {
        this.setState({
          showModal: false,
          interaction: 2,
          button1: evss
        });
      }
    } else if (evss === t('screen.creatissu_modalDropdown1_item1') ||
      evss === t('screen.creatissu_modalDropdown1_item2') ||
      evss === t('screen.creatissu_modalDropdown1_item3') ||
      evss === t('screen.creatissu_modalDropdown1_item4')) {
      switch (evss) {
        case t('screen.creatissu_modalDropdown1_item1'):
          this.setState({
            type: 1,
            showModal: false,
            button2: evss
          });
          break;
        case t('screen.creatissu_modalDropdown1_item2'):
          this.setState({
            type: 2,
            showModal: false,
            button2: evss
          });

          break;
        case t('screen.creatissu_modalDropdown1_item3'):
          this.setState({
            type: 3,
            showModal: false,
            button2: evss
          });

          break;
        case t('screen.creatissu_modalDropdown1_item4'):
          this.setState({
            type: 4,
            showModal: false,
            button2: evss
          });

          break;
      }
    } else {
      switch (evss) {
        case t('screen.creatissu_modalDropdown4_item1'):
          this.setState({
            status: 1,
            showModal: false,
            button3: evss
          });

          break;
        case t('screen.creatissu_modalDropdown4_item2'):
          this.setState({
            status: 2,
            showModal: false,
            button3: evss
          });

          break;
        case t('screen.creatissu_modalDropdown4_item3'):
          this.setState({
            status: 3,
            showModal: false,
            button3: evss
          });

          break;
      }
    }
  }
  updateIndex(bs) {
    this.setState({
      showModal: true,
      buttons: bs
    })
  }
  submint(interaction, type, status, issueId) {

    this.props.navigation.navigate('statisticsDetailsStack', {
      interaction: interaction,
      type: type,
      status: status,
      issueId: issueId,
      projectId: this.state.projectId
    });
    this.setState({
      issueStatus: false
    })
  }
  jump() {
    this.props.navigation.navigate('creatissuStack', {
      projectId: this.props.navigation.state.params.id
    });
  }
  goback(text) {
    this.props.navigation.navigate(text);
  }
  render() {
    let modelInnerButtonsText;
    let oBx = this.state.buttons;
    let roleName = this.props.monitor.loginData.roles[0].roleName;
    let but1 = this.state.button1, but2 = this.state.button2, but3 = this.state.button3;
    let but = [but1, but2, but3];
    let Nav = [t('screen.creatissu_modalDropdown5'), t('screen.creatissu_modalDropdown3'), t('screen.creatissu_modalDropdown1'), t('screen.creatissu_modalDropdown4')];
    if (oBx === t('screen.creatissu_modalDropdown3_item1') || oBx === t('screen.creatissu_modalDropdown3_item2') || oBx === t('screen.creatissu_modalDropdown3')) {
      modelInnerButtonsText = [t('screen.creatissu_modalDropdown3_item1'), t('screen.creatissu_modalDropdown3_item2')]
    } else if (oBx === t('screen.creatissu_modalDropdown1_item1') ||
      oBx === t('screen.creatissu_modalDropdown1_item2') ||
      oBx === t('screen.creatissu_modalDropdown1_item3') ||
      oBx === t('screen.creatissu_modalDropdown1_item4') ||
      oBx === t('screen.creatissu_modalDropdown1')) {
      modelInnerButtonsText = [t('screen.creatissu_modalDropdown1_item1'), t('screen.creatissu_modalDropdown1_item2'), t('screen.creatissu_modalDropdown1_item3'), t('screen.creatissu_modalDropdown1_item4')]
    } else {
      modelInnerButtonsText = [t('screen.creatissu_modalDropdown4_item1'), t('screen.creatissu_modalDropdown4_item2'), t('screen.creatissu_modalDropdown4_item3')]
    }
    console.log('this.isint', this);
    if (this.props.monitor.issueList.fetchIssueListPending) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      )
    }
    let issueItemList = [];
    //深拷贝,不改变原数组
    let issueListById = JSON.parse(JSON.stringify(this.props.monitor.issueList.byId));
    for (const key in issueListById) {
      issueItemList.push(issueListById[key]);
    }
    Issueres = issueItemList.map((item, i) => {
      item.interaction = item.interaction === 1 ? t('screen.creatissu_modalDropdown3_item1') : t('screen.creatissu_modalDropdown3_item2');
      switch (item.type) {
        case 1:
          item.type = t('screen.creatissu_modalDropdown1_item1')
          break;
        case 2:
          item.type = t('screen.creatissu_modalDropdown1_item2')
          break;
        case 3:
          item.type = t('screen.creatissu_modalDropdown1_item3')
          break;
        case 4:
          item.type = t('screen.creatissu_modalDropdown1_item4')
          break;
      }
      switch (item.status) {
        case 1:
          item.status = t('screen.creatissu_modalDropdown4_item1')
          break;
        case 2:
          item.status = t('screen.creatissu_modalDropdown4_item2')
          break;
        case 3:
          item.status = t('screen.creatissu_modalDropdown4_item3')
          break;
      }
      return {
        name: item.name,
        interaction: item.interaction,
        type: item.type,
        status: item.status,
        id: item.id,
      }
    })
    console.log("Issueres", Issueres);
    if (roleName === "pojectDirector" || roleName === "ownerEngineer" || roleName === "specializedSupervisionEngineer") {
      Issueres = Issueres.reduce((r, c, i) => {
        if (c.interaction === t('screen.creatissu_modalDropdown3_item2')) {
          return [
            ...r,
            c
          ];
        } else {
          return [];
        }
      }, []);
      console.log("supervisorList", Issueres);
    }
    return (
      <View style={styles.worp}>
        <Header
          leftComponent={<View >
            <Text
              onPress={this.goback.bind(this, "ProjectDetailsStack")}
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
            title={t('drawer.creatissu_label')}
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
                      modelInnerButtonsText.map((item, i) => {
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
              Issueres.map((item, i) => {
                return <TouchableOpacity key={i}
                  onPress={this.submint.bind(this, item.interaction, item.type, item.status, item.id)} style={styles.headerNav}>
                  <View style={styles.viewList}>
                    <Text style={styles.navText}>
                      {item.name}
                    </Text>
                  </View >
                  <View style={styles.viewList}>
                    <Text style={styles.navText}>
                      {
                        item.interaction
                      }
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
