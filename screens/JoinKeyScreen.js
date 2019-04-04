import React from "react";
import { StyleSheet, Text, Button, TextInput, View } from "react-native";

export default class JoinKeyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomKey: "",
      error: "",
      loading: false
    };
  }

  static navigationOptions = {
    title: "Join"
  };

  onJoin = () => {
    if (this.state.roomKey !== "") {
      this.props.navigation.navigate("Join");
    } else {
      window.alert("You must enter a room key.");
    }
  };

  render() {
    return (
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Host ID:</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.roomKey}
            onChangeText={roomKey => this.setState({ roomKey })}
          />
        </View>
        <Button title="Join" onPress={this.onJoin} />
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