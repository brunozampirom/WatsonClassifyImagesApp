import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableHighlight, View, Image, Text, ScrollView, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import { Images } from './assets/images.js'
import { connect } from 'react-redux';
import { compareMyImage, classifyListImage } from '../store/actions/'
class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            showFinder: false,
            imageSelected: undefined,
            images: Images.map((image) => ( {val: image, set: 0})),
        }
    }

    componentDidMount() {
        this.props.classifyListImage(Images);
    }

    async onClickImage(visible, image) {
        // this.setState({ modal: visible, imageSelected: image});
        const similarList = await this.props.compareMyImage(image);
        const listImages = this.state.images;
        const listImagesTransformed = listImages.map(img => {
            if(similarList.find(imgsimilarList => (imgsimilarList.image === img.val.uri))) {
                return ({val:img.val , set:1});
            }
            else {
                return ({val:img.val , set:0});
            }
        })
        this.setState({images: listImagesTransformed});
    }

    render() {
        const images = this.state.images.map((val, key) => (
            <TouchableHighlight key={key} onPress={() => this.onClickImage(true, val.val)}>
                <View style={[styles.imageWrap, val.set === 1 ? {backgroundColor:'green'} : null]}>
                    <Image source={val.val} style={styles.image}/>
                </View>
            </TouchableHighlight>
        ))
        return(
            <View style={{flex: 1}}>
                <StatusBar hidden />
                <View style={styles.boxTop}>
                    <Image source={require('../images/IBM-Watson-logo1.png')} style={styles.logo} resizeMode="contain"/>
                </View>
                {
                    this.state.showFinder ? (
                    <View style={styles.boxTop}>
                    </View>
                    ) : null
                }
                <ScrollView contentContainerStyle={styles.container}>
                    { this.props.isLoading ? (<ActivityIndicator style={styles.spinner} size="large" color="#0000f0" />) : images }
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eee'
  },
  imageWrap:{
    margin: 4,
    padding: 5,
    height: (Dimensions.get('window').height/4) - 12,
    width: (Dimensions.get('window').width/3) - 8,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  logo: {
    marginTop: 4,
    width: (Dimensions.get('window').width/1.8),
  },
  modal: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0, 0.8)'
  },
  boxTop: {
    height: (Dimensions.get('window').height/7.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 8,
    marginTop: 25,
  },
  h5Preto: {
    fontSize: 26,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 4,
    color: 'black',
    paddingTop: 50
  },
  spinner: {
    flex: 1, 
    height: Dimensions.get('window').height
  }
});
const mapStateToProps = ({ classifyReducer }) => {
  const { isLoading } = classifyReducer;
  return { isLoading };
};
export default connect(mapStateToProps, { classifyListImage, compareMyImage })(Gallery);