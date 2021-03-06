import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Button, Image, ActivityIndicator, StyleSheet } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import DetailScreen from './DetailScreen';
import * as Actions from '../actions'; //Import your actions

class PreviewScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
    this.state = { selectedRecipe: 0 };
    // this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.getData(); //call our action
  }

  state = {
    modalVisible: false,
    selectedRecipe: 1,
  };
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentWillReceiveProps( newProps ){
      this.setState( {modalVisible : false });
  }

  render() {
    if (this.props.loading) {
      return (
          <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator animating={true}/>
          </View>
      );
    } else {          
      //alert( this.props.data[1].title );
			var item = this.props.data[this.state.selectedRecipe];
			var pic1 = item.pic;
 
      return (
        <View style={{marginTop: 22}}>
          <Button title = "What's For Dinner?"
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
              }}
          />

  
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              // alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text style={styles.title}>
                    {item.title}          
                </Text>
                <Image source = {{uri: pic1}} style={{width: 400, height: 400}}/>
                <DetailScreen recipe={item}/>
              </View>
              <View>
                <Button title = "Lemme Try Something Else"
                onPress={() => {
                  //this.state.selectedRecipe = 2;
                  this.setState({ selectedRecipe: getRandomInt(this.props.data.length )});
                }}
              />
              </View>
            </View>
          </Modal>
                

        </View>
      );
    }
  }
}


// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
      loading: state.dataReducer.loading,
      data: state.dataReducer.data
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(PreviewScreen);


const styles = StyleSheet.create({
  activityIndicatorContainer:{
      backgroundColor: "#fff",
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
  },


  title:{
      fontSize: 36,
      fontWeight: "600"
  },

  description:{
      marginTop: 5,
      fontSize: 14,
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
