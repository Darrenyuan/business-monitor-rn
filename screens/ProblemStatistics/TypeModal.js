import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import statisticsStyle from './statisticsStyle';
import { makeUUID } from '../../utils/uuid';
const styles = StyleSheet.create({ ...statisticsStyle });

class TypeModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Modal
          visible={this.props.visible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {}}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.handleTypeModalVisible(false);
            }}
          >
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.boxView}>
                  <View style={styles.courseWrap}>
                    {Array.from(this.props.typeMap.values()).map((value, key) => {
                      if (key > 0) {
                        //if type=0,it mean default,no need to render.
                        return (
                          <TouchableOpacity
                            key={makeUUID()}
                            onPress={() => {
                              this.props.handleTypeModalValue(key);
                              this.props.handleTypeModalVisible(false);
                            }}
                          >
                            <View style={{ padding: 10 }}>
                              <Text style={styles.textstyle}>{value}</Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    })}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

export default TypeModal;
