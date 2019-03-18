import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../services/redux/actions";
import { ListItem, Header, Icon } from 'react-native-elements';
import projectStyle from './projectlistStyle';


const styles = StyleSheet.create({ ...projectStyle });

class Projects extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "工程列表",
      noMoreData: false,
    }
  }

  componentDidMount() {
    this.props.actions.fetchProjectList({
      page: 1,
      pageSize: 10
    })
  }
  onpress(evss) {
    this.props.navigation.navigate('ProjectDetailsStack', {
      info: evss
    })
  }
  goback(text) {
    this.props.navigation.navigate(text);
  }
  queryData() {
    if (list.length > 0) {
      this.setState({
        list: [...this.state.list, ...list],
      });
    } else {
      this.setState({
        noMoreData: true
      })
    }
    if (list.length < this.state.pagesize) {
      this.setState({
        noMoreData: true
      })
    }
  }
  scrollHandle(evt) {
    let y = evt.nativeEvent.contentOffset.y;
    let height = evt.nativeEvent.layoutMeasurement.height;
    let contentHeight = evt.nativeEvent.contentSize.height;
    console.log("y", y);
    console.log("height", height);
    console.log("contentHeight", contentHeight);
    console.log("evt", evt.nativeEvent);
  }
  render() {
    console.log("this0", this);
    let lists = [];
    if (this.props.monitor.projectList.fetchProjectListPending) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      )
    }
    let listss = this.props.monitor.projectList.byId;
    for (const key in listss) {
      lists.push(listss[key]);
    }
    return (
      <View style={styles.worp}>
        <Header
          centerComponent={{ text: this.state.name, style: { color: '#fff', fontSize: 18 } }}
          rightComponent={<View >
            <Icon name="home" color="#fff" size={28}
              iconStyle={{ marginRight: 10 }}
              onPress={this.goback.bind(this, "projectsStack")}
            />

          </View>}
        />
        <ScrollView
          onScroll={(evt) => this.scrollHandle(evt)}
        >
          <View>
            {
              lists.map((item, i) => {
                return <ListItem key={i} title={item.name} rightIcon={{ name: 'chevron-right' }}
                  containerStyle={styles.container}
                  onPress={this.onpress.bind(this, item.id)}
                />
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
)(Projects);
