import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as firebase from 'firebase';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: '' }
  }
  static navigationOptions = {
    title: 'Settings',
  };
  onSignoutPress() {
    this.setState({ error: '' });
    firebase.auth().signOut()
      .then(() => {
        this.props.navigation.navigate('Auth');
      })
      .catch(() => {
        this.setState({ error: 'Failed to sign out.' });
        window.alert(error);
      })
  }

  render() {
    return (
      <View>
        <TouchableOpacity 
          style={{ 
            backgroundColor: "red",
            padding: 20, 
            marginTop: 525,
            margin: 20
          }}
          onPress={this.onSignoutPress.bind(this)}
        >
          <Text 
            style={{ 
              color: "white", 
              fontSize: 24, 
              fontWeight: "bold", 
              textAlign: "center" 
            }} 
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}