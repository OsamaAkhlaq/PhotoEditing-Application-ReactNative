import React, { Component } from 'react';
import Styles from '../assets/styles/CameraScreenStyles';
import ExpoCamera from '../components/ExpoCamera';

export default class CameraScreen extends Component {

  static navigationOptions = { header: null };

  render() {
    return (
      <ExpoCamera />
    );
  }
}