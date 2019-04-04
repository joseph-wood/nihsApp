import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import fbConfig from '../config/fbConfig';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: ''
    }
  }

  static navigationOptions = {
    title: 'Home'
  };

  getEmailAddress() {
    var user = fbConfig.auth().currentUser;
    var email;
    if (user != null) {
      var email = user.email;
      return (
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 25, textAlign: 'center' }}>Welcome {email}</Text>
        </View>
      )
    } else {
      return (
        <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 25, textAlign: 'center' }}>Welcome to NiHƧ.</Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
          <Image source={require("./logo.png")} style={styles.logo}/>
            {this.getEmailAddress()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    alignSelf: 'center'
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: 20
  }
});
