import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, TouchableHighlight } from 'react-native';
import Styles from '../assets/styles/EditScreenStyles';
//import { PIXI, ExpoPixi } from 'expo-pixi';
//import { Grayscale } from 'react-native-color-matrix-image-filters';


export default class EditScreen extends Component {

static navigationOptions = { header: null };

// addfilter = () => {
//  <Grayscale>
  //  <Image source={{ uri: navigation.getParam('img').uri }} style={Styles.selectedImage}/>
 // </Grayscale> 
//};

  render() {
	const { navigation } = this.props;
    return (
<View>
// 	<TouchableHighlight onPress={this.addfilter().bind(this)}
  //            style={Styles.buttons}> 
	//	<Text> Grayscale </Text> 
    //        </TouchableHighlight> 
      	<Image source={{ uri: navigation.getParam('img').uri }} style={Styles.selectedImage}/> 
</View>
    );
  }
}

//