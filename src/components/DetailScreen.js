import React, {Component} from 'react';
import {StyleSheet,  FlatList,Modal, Text, TouchableHighlight, View, Button,Image, ActivityIndicator,AppRegistry} from 'react-native';


class DetailScreen extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentWillReceiveProps( newProps ){
      this.setState( {modalVisible : newProps.visible});
  }
  
  render() {
    
    //var item = this.props.data[1];
    //let pic1 = item.pic;
    return (
      <View style={{marginTop: 22}}>
        <Button title = "Food"
           onPress={() => {
             this.setModalVisible(!this.state.modalVisible);
            }}
        />

 
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>

              
              <Button title = "Can I Have Seconds?"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </Button>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

export default DetailScreen;