import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import Photo from './Photo';
import { t } from '../../services/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../services/redux/actions';
import { apiUploadImage } from '../../services/axios/api';
import Toast from 'react-native-root-toast';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './CreatissuStyle';
import _ from 'lodash';
import moment from 'moment';
const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';
let timer;
class GalleryScreen extends React.Component {
  state = {
    faces: {},
    images: {},
    photos: [],
    selected: [],
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  };

  toggleSelection = (uri, isSelected) => {
    let selected = this.state.selected;
    if (isSelected) {
      selected.push(uri);
    } else {
      selected = selected.filter(item => item !== uri);
    }
    if (selected.length > 2) {
      alert(t('screen.createissue_togallery_image_exceed_limit_2'));
      selected = selected.slice(0, 2);
    }
    this.setState({ selected });
  };

  // saveToGallery = async () => {
  //   // console.log(this.state);
  //   const photos = this.state.selected;

  //   if (photos.length > 0) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  //     if (status !== 'granted') {
  //       throw new Error('Denied CAMERA_ROLL permissions!');
  //     }
  //     let remotePaths = [];
  //     const promises = photos.map(photoUri => {
  //       return new Promise((resolve, reject) => {
  //         apiUploadImage({ uri: photoUri })
  //           .then(response => response.json())
  //           .then(responseJson => {
  //             remotePaths.push(responseJson.data);
  //             return resolve(responseJson.data);
  //           })
  //           .catch(error => {
  //             console.error(error);
  //             return reject(error);
  //           });
  //       });
  //     });

  //     await Promise.all(promises);
  //     let toast = Toast.show(t('screen.createissue_save'));
  //     setTimeout(function() {
  //       Toast.hide(toast);
  //     }, 2000);
  //     FileSystem.deleteAsync(FileSystem.documentDirectory + 'photos', { idempotent: true });
  //     this.props.actions.setIsInCamera({ isInCamera: false });
  //     this.props.actions.setImagePaths({ imagePaths: remotePaths });
  //   } else {
  //     let toast = Toast.show(t('screen.createissue_nochoice'), {
  //       position: SCREEN_HEIGHT * 0.45,
  //     });
  //     setTimeout(function() {
  //       Toast.hide(toast);
  //     }, 2000);
  //   }
  // };
  throttling = async () => {
    let _this = this;
    const photos = _this.state.selected;
    if (timer) {
      clearTimeout(timer);
    }
    if (photos.length > 0) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
        _this.props.actions.setIsInCamera({ isInCamera: false });
        throw new Error('Denied CAMERA_ROLL permissions!');
      }
      let remotePaths = [];
      const promises = photos.map(photoUri => {
        return new Promise((resolve, reject) => {
          apiUploadImage({ uri: photoUri })
            .then(response => response.json())
            .then(responseJson => {
              remotePaths.push(responseJson.data);
              return resolve(responseJson.data);
            })
            .catch(error => {
              console.error(error);
              return reject(error);
            });
        });
      });

      await Promise.all(promises);
      let toast = Toast.show(t('screen.createissue_save'), {
        position: SCREEN_HEIGHT * 0.45,
      });
      timer = setTimeout(function() {
        Toast.hide(toast);
      }, 2000);
      // FileSystem.deleteAsync(FileSystem.documentDirectory + 'photos', { idempotent: true });
      _this.props.actions.setIsInCamera({ isInCamera: false });
      _this.props.actions.setImagePaths({ imagePaths: remotePaths });
    } else {
      let toast = Toast.show(t('screen.createissue_nochoice'), {
        position: SCREEN_HEIGHT * 0.45,
      });
      timer = setTimeout(function() {
        Toast.hide(toast);
      }, 2000);
    }
  };

  renderPhoto = fileName => (
    <Photo
      key={fileName}
      uri={`${PHOTOS_DIR}/${fileName}`}
      onSelectionToggle={this.toggleSelection}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={_.debounce(this.throttling, 1000, {
              leading: true,
              maxWait: 5000,
              trailing: false,
            })}
          >
            <Text style={styles.whiteText}>{t('screen.createissue_togallery')}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>{this.state.photos.map(this.renderPhoto)}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4630EB',
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  button: {
    padding: 20,
  },
  whiteText: {
    color: 'white',
  },
});
function mapStateToProps(state) {
  return {
    monitor: state,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GalleryScreen);
