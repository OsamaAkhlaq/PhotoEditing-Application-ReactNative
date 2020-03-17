import React, { Component } from 'react';
import { CameraRoll, Text, View, Image, ImageBackground, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Styles from '../assets/styles/HomeScreenStyles';
import * as Permissions from 'expo-permissions';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: ''
    }
  }
state = {hasCameraPermission: null}
  static navigationOptions = { header: null };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    const { status1 } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    this.setState({hasCameraPermission:status==='granted'});
    this.setState({hasCameraPermission:status1==='granted'});
  }
  async _takePhoto() {
    const result = await ImagePicker.launchCameraAsync({
      allowEditing: false,
      exif: true
    });
  
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    CameraRoll.saveToCameraRoll(this.state.image);
  };

  async galeryButton() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!result.cancelled) {
      this.props.navigation.navigate('Edit', { img: result })
      this.setState({ image: result.uri });
    }
    CameraRoll.saveToCameraRoll(this.state.image);
  }

  render() {

    return (
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={Styles.container}
      >

        <View style={Styles.bigView}>

          <View style={Styles.topView}>
            <Text style={Styles.mainTitle}>H O M E</Text>
          </View>

          <View style={Styles.menuView}>
            <TouchableHighlight
              onPress={() => this._takePhoto()}
              style={Styles.buttons}
            >
              <>
                <Image
                  style={Styles.imageButtons}
                  source={require('../assets/images/icons/Camera.png')}
                />
                <Text style={Styles.textButtons}>C A M E R A</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.galeryButton()}
              style={Styles.buttons}
            >
              <>
                <Image
                  style={Styles.imageButtons}
                  source={require('../assets/images/icons/Photos.png')}
                />
                <Text style={Styles.textButtons}>G A L L E R Y</Text>
              </>
            </TouchableHighlight>
          </View>

        </View>

      </ImageBackground>
    );

  }
}
  
export default HomeScreen
