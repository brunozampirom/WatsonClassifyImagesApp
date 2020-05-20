import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class ImageElement extends Component {
    render() {
        return(
            <Image source={this.props.imageSource} style={styles.image}/>
        );
    }
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  }
});
