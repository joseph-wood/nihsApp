import React from "react";
import { StyleSheet, Text, Button, View, Share } from "react-native";

export default class HostKeyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // fixed room ID
      roomKey: "awiidwa82ml1mnl2189amkdlwa92",
      error: "",
      loading: false
    };
  }

  static navigationOptions = {
    title: "Host"
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: this.state.roomKey,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  onHost = () => {
    if (this.state.roomKey !== "") {
      this.props.navigation.navigate("Host");
    } else {
      window.alert("You must enter a room key.");
    }
  };

  render() {
    return (
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Room ID:</Text>
          {/* Fixed room ID */}
          <Text style={{textAlign: 'center'}}>{this.state.roomKey}</Text>

          {/* <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.roomKey}
            onChangeText={roomKey => this.setState({ roomKey })}
            
          /> */}
        </View>
        <Button title="Share" onPress={this.onShare} />
        <Button title="Host" onPress={this.onHost} />
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