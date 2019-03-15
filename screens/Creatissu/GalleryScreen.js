import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import Photo from './Photo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../services/redux/actions';
import { apiUploadImage } from '../../services/axios/api';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

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
    this.setState({ selected });
  };

  saveToGallery = async () => {
    console.log(this.state);
    const photos = this.state.selected;

    if (photos.length > 0) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
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
      alert("Successfully saved photos to user's gallery!");
      console.log(remotePaths);
      FileSystem.deleteAsync(FileSystem.documentDirectory + 'photos', { idempotent: true });
      this.props.actions.setIsInCamera({ isInCamera: false });
      this.props.actions.setImagePaths({ imagePaths: remotePaths });
    } else {
      alert('No photos to save!');
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
          <TouchableOpacity style={styles.button} onPress={this.saveToGallery}>
            <Text style={styles.whiteText}>Save selected to gallery</Text>
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
