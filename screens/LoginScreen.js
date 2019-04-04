import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  ActivityIndicator,
  Image
} from "react-native";
import fbConfig from "../config/fbConfig";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      secure: true
    };
  }

  static navigationOptions = {
    title: "Login"
  };

  async onLoginPress() {
    this.setState({ error: "", loading: true });
    const { email, password } = this.state;
    try {
      await fbConfig.auth().signInWithEmailAndPassword(email, password);

      this.setState({ error: "", loading: false });
      this.props.navigation.navigate("Main");
    } catch (err) {
      if (email == "" || password == "") {
        this.setState({
          error: "You must enter an email address and password.",
          loading: false
        });
      } else {
        this.setState({
          error: "Incorrect email and password combination, please try again.",
          loading: false
        });
      }
      window.alert(this.state.error);
    }
  }

  toggleSecure() {
    this.setState({ secure: !this.state.secure });
  }

  renderLoading() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return <Button title="Login" onPress={this.onLoginPress.bind(this)} />;
  }

  renderSecureToggle() {
    if (this.state.secure) {
      return <Button title="Show" onPress={this.toggleSecure.bind(this)} />;
    } else {
      return <Button title="Hide" onPress={this.toggleSecure.bind(this)} />;
    }
  }

  render() {
    return (
      <View>
        <Image source={require("./logo.png")} style={styles.logo} />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry={this.state.secure}
          />
          {this.renderSecureToggle()}
        </View>
        {this.renderLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  inputContainer: {
    margin: 20
  },
  logo: {
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20
  },
  label: {
    fontSize: 18
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 20
  },
  toggle: {
    fontSize: 12,
    alignSelf: "flex-end"
  }
});
