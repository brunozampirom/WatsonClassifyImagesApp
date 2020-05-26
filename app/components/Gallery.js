import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Image, Text, ScrollView, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Images } from './assets/images.js'
import { connect } from 'react-redux';
import { compareMyImage, classifyListImage, classifyAImage } from '../store/actions/'
class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            showFinder: true,
        }
    }

    componentDidMount() {
        this.props.classifyListImage(Images);
    }

    async onClickImage(image) {
        this.props.compareMyImage(image);
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

    addNewImage = async () => {
        this.props.classifyAImage({url: this.state.search});
        this.setState({search: ''})
    }
    
    render() {
        const images = this.props.imagesList.map((img, key) => (
            <TouchableHighlight key={key} underlayColor={'#ccc'}  activeOpacity={.5} onPress={() => this.onClickImage(img)}>
                <View style={[styles.imageWrap, img.set === 1 ? {backgroundColor:'#00FF00'} : null]}>
                    <Image source={{ uri: img.url }} style={styles.image}/>
                </View>
            </TouchableHighlight>
        ))
        return(
            <View style={{flex: 1}}>
                <StatusBar hidden />
                <View style={styles.boxTop}>
                    <Image source={require('../images/IBM-Watson-logo1.png')} style={styles.logo} resizeMode="contain"/>
                    <SearchBar
                        platform='android'
                        value={this.state.search}
                        onChangeText={this.updateSearch}
                        placeholder='Type Your Image Link Here...'
                        onSubmitEditing={this.addNewImage}
                    />
                </View>
                <ScrollView contentContainerStyle={styles.container}>
                    { this.props.isLoading ? (<ActivityIndicator style={styles.spinner} size="large" color="#0000f0" />) 
                        : images }
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  imageWrap:{
    margin: 4,
    padding: 5,
    height: (Dimensions.get('window').height/4) - 12,
    width: (Dimensions.get('window').width/3) - 8,
    backgroundColor: '#eee',
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  logo: {
    width: (Dimensions.get('window').width/1.8),
    height: (Dimensions.get('window').height/10),
  },
  modal: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0, 0.8)'
  },
  boxTop: {
    height: (Dimensions.get('window').height/5),
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
    paddingHorizontal: 4
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
  const { isLoading, imagesList } = classifyReducer;
  return { isLoading, imagesList };
};
export default connect(mapStateToProps, { classifyListImage, classifyAImage, compareMyImage })(Gallery);