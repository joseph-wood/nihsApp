import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import fbConfig from "../config/fbConfig";

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      loading: false,
      secure: true
    };
  }
  static navigationOptions = {
    title: "Register"
  };

  onRegisterPress() {
    if (this.state.password === this.state.confirmPassword) {
      if (this.state.password.length >= 6) {
        this.setState({ error: "", loading: true });
        const { email, password } = this.state;
        fbConfig
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ error: "", loading: false });
            this.props.navigation.navigate("Main");
          })
          .catch(() => {
            this.setState({
              error: "This email is not valid.",
              loading: false
            });
            window.alert(this.state.error);
          });
      } else {
        window.alert("Your password must contain at least 6 characters.");
      }
    } else {
      window.alert("Passwords do not match.");
    }
  }

  toggleSecure() {
    this.setState({ secure: !this.state.secure });
  }

  renderSecureToggle() {
    if (this.state.secure) {
      return <Button title="Show" onPress={this.toggleSecure.bind(this)} />;
    } else {
      return <Button title="Hide" onPress={this.toggleSecure.bind(this)} />;
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          style={{ marginBottom: 20 }}
          size="large"
          color="#0000ff"
        />
      );
    }
    return (
      <View>
        <Button
          title="Register"
          style={{ marginBottom: 20 }}
          onPress={this.onRegisterPress.bind(this)}
        />
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <Image source={require("./logo.png")} style={styles.logo} />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            secureTextEntry={this.state.secure}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            secureTextEntry={this.state.secure}
          />
          {this.renderSecureToggle()}
        </View>
        {this.renderLoading()}
      </ScrollView>
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
  title: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20
  },
  logo: {
    alignSelf: "center"
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
