import React, { Component } from 'react';
import { Image, Text, View, TouchableHighlight } from 'react-native';
import Styles from '../assets/styles/CameraScreenStyles'
import * as Permissions from 'expo-permissions';
import { Slider } from 'react-native-elements';
import { Camera } from 'expo-camera';

export default class ExpoCamera extends Component {
  state = {
    cam: 0,
    zoom: 0,
    sliderFlash: 0,
    showZoomSlider: false,
    showFlashSlider: false,
    hasCameraPermission: null,
    
    autoFocus: Camera.Constants.AutoFocus, // on, off, focusDepht
    whiteBalance: Camera.Constants.WhiteBalance, // auto, sunny, cloudy, shadow, fluorescent, incandescent
    videoStabilizationMode: Camera.Constants.VideoStabilization,
    quality: Camera.Constants.VideoQuality,

    useCamera2Api: '', // True to use advanced settings
    ratio: '', // 4:3, 16:9, 1:1, taken by 'takePictureAsync' - avaibles at getAvailablePictureSizesAsync
    focusDepht: '', // 0 to 1, needs useCamera2Api set to true
    // onCameraReady(function)
    // onFacesDetected(function) - https://docs.expo.io/versions/latest/sdk/facedetector/#event-shape
    // faceDetectorSettings(functions) - https://docs.expo.io/versions/latest/sdk/facedetector/#settings
    // onMountError(function) 
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission:status==='granted'});
  }

  flipCamera() {
    this.setState({cam:this.state.cam+1%2});
  }

  showFlashSlider() {
    this.setState({showFlashSlider:!this.state.showFlashSlider})
  }

  showZoomSlider() {
    this.setState({showZoomSlider:!this.state.showZoomSlider})
  }

  changeFlash(sliderVal) {
    this.setState({flash:sliderVal});
  }

  changeZoom(sliderVal) {
    this.setState({zoom:sliderVal});
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <>

        {/*/////////////////// CAMERA ////////////////////////*/}
        
        <Camera
          style={Styles.cam}
          type={this.state.cam}
          flashMode={this.state.flash}
          zoom={this.state.zoom}
          ratio='4:3'
        />

        {/*////////////////// POPUP MENU /////////////////////*/}

        <View style={Styles.tools}>
          {
            this.state.showFlashSlider &&
            <Slider
              style={{ flex: 0.9, alignSelf: 'center' }}
              onValueChange={v => this.changeFlash(v)}
              minimumValue={0}
              maximumValue={3}
              step={1}
            />
          }

          {
            this.state.showZoomSlider &&
            <Slider
              style={{ flex: 0.9, alignSelf: 'center' }}
              onValueChange={v => this.changeZoom(v)}
              minimumValue={0}
              maximumValue={1}
            />
          }
        </View>

        {/*///////////////// BOTTOM MENU ////////////////////*/}

        <View style={Styles.tools}>

          <TouchableHighlight onPress={() => this.flipCamera()}>
            <Image
              style={Styles.imageButtons}
              source={require('../assets/images/icons/Flip.png')}
            />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.showFlashSlider()}>
            <Image
              style={Styles.imageButtons}
              source={require('../assets/images/icons/Flash.png')}
            />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.showZoomSlider()}>
            <Image
              style={Styles.imageButtons}
              source={require('../assets/images/icons/Zoom.png')}
            />
          </TouchableHighlight>

        </View>
        </>
      )
      
    }
  }
}
