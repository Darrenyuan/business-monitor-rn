import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet, ActivityIndicator, TextInput } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../services/redux/actions";
import { Button, Header, Image, Icon, Overlay, Input } from 'react-native-elements';
import staDetStyle from './staDetStyle';
const styles = StyleSheet.create({ ...staDetStyle });

class Projects extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "问题详情信息",
      isVisible: false,
      texts: "",
      bool: true,
      but: "不同意",
      disabled: false
    }
  }

  componentDidMount() {
    let id = this.props.navigation.state.params.status;
    // this.props.actions.fetchIssueList({
    //   projectId: id,
    //   page: 1,
    //   pageSize: 10,
    //   keyword: 0,
    //   dimension: 0
    // })
  }

  onperss(evss) {
    this.props.navigation.navigate('ProblemStatisticsStack');
    console.log("批准不批准");
  }
  onpass(str) {
    if (str === "不同意") {
      this.setState({ isVisible: true, });
    } else {
      this.setState({ but: "不同意", disabled: false });
      this.props.navigation.navigate('ProblemStatisticsStack');
    }
  }
  goback(text) {
    this.props.navigation.navigate(text);
  }
  onChangeText(tex) {
    console.log("change", tex);
    this.setState({
      texts: tex
    })
  }
  onVisible() {
    this.setState({
      isVisible: false,
      bool: false,
      but: "提交",
      disabled: true,
    })
  }
  render() {
    console.log("tishsssssss", this);
    let id = this.props.navigation.state.params.id;
    let DetailId = this.props.monitor.issueList.byId[id];
    let status = this.props.navigation.state.params.status;
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
              onPress={this.goback.bind(this, "ProblemStatisticsStack")}
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
            <View style={styles.contenter}>
              <View style={styles.viewWorp}>
                <Text style={styles.henderText}>
                  {DetailId.name}
                </Text>
              </View>
              <View style={styles.viewWorps}>
                <View style={styles.imgStyle}>
                  <View style={styles.issueStyle}>
                    <Text style={{ fontSize: 18 }}>问题描述:</Text>
                  </View>
                  <Image
                    source={{ uri: DetailId.imagePath }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
                <View style={styles.textStyle}>
                  <Text style={{ lineHeight: 28, fontSize: 16, }}>   {DetailId.description}</Text>
                </View>
              </View>
              <View style={styles.viewWorps}>
                <View style={styles.imgStyle}>
                  <View style={styles.issueStyle}>
                    <Text style={{ fontSize: 18 }}>整改描述:</Text>
                  </View>
                  <Image
                    source={{ uri: DetailId.imagePath }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
                <View style={styles.textStyle}>
                  <Text style={{ lineHeight: 28, fontSize: 16, }}>   {DetailId.description}</Text>
                </View>
              </View>
            </View>
            {
              this.state.bool ? <Text></Text> : <View style={styles.OpinStyle}>
                <View>
                  <Text style={{ fontSize: 18, marginRight: 10 }}>意见: </Text>
                </View>
                <View>
                  <Text style={styles.OpinionStyle}>{this.state.texts}</Text>
                </View>
              </View>
            }

            <View style={styles.butViewStyle}>
              {(status === "已确认" || status === "待反馈") ? <Text></Text> : <Button
                title={this.state.but}
                onPress={this.onpass.bind(this, this.state.but)}
                containerStyle={styles.butStyle}
              />}
              {
                status === "已确认" ? <Text></Text> : <Button
                  title="确认"
                  disabled={this.state.disabled}
                  onPress={this.onperss.bind(this)}
                  containerStyle={styles.butStyle}
                />
              }

            </View>
            <Overlay isVisible={this.state.isVisible}
              windowBackgroundColor="rgba(0, 0, 0, .7)"
              overlayBackgroundColor="#fff"
            >
              <View>
                <Input
                  placeholder='请输入意见'
                  containerStyle={styles.modulStyle}
                  onChangeText={this.onChangeText.bind(this)}
                  shake={true}
                  multiline={true}
                />
                <Button
                  title="提交"
                  onPress={this.onVisible.bind(this)}
                />
              </View>

            </Overlay>
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