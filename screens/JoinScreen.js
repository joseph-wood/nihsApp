import React from "react";
import {
  View,
  Button,
  Image,
  Text,
  ImagePickerIOS,
  ScrollView,
  ActivityIndicator
} from "react-native";
import SocketIOClient from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import { RTCClient, Signaling } from "./rtc-client";
import RNFS from "react-native-fs";

export default class JoinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: "",
      name: "Joseph",
      text: "HI",
      attachment: null,
      localImage: null,
      loading: true
    };

    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
  }

  async componentDidMount() {
    this.socket = SocketIOClient("https://nihsserver-tnrkikghsq.now.sh:443");
    this.signaling = new Signaling(this.socket);
    this.rtc = new RTCClient(this.signaling, true);
    this.socket.on("message", this.onReceivedMessage);

    this.rtc.start();
    this.rtc.on("ready", () => {
      this.rtc.sendMessage("hello data channel1");
      this.rtc.sendMessage("hello data channel2");
      this.setState({ loading: false });
    });
    this.rtc.on("dataMessage", data => {
      this.setState({ image: data });
    });
  }

  static navigationOptions = {
    title: "Join",
    headerLeft: null
  };

  deletePicture = () => {
    this.setState({ attachment: null });
    this.rtc.sendMessage(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    );
  };

  addPicutre = () => {
    ImagePickerIOS.openSelectDialog(
      {},
      async imageUri => {
        this.rtc.sendMessage("file ,");

        let filePath = RNFS.TemporaryDirectoryPath + "/image.jpg";
        try {
          await RNFS.copyAssetsFileIOS(
            imageUri,
            filePath,
            200,
            200,
            0.25,
            1.0,
            "contain"
          );
          let file = await RNFS.readFile(filePath, "base64");
          this.rtc.sendMessage("data:image/jpeg;base64," + file);
          console.log("sent file");
          this.setState({ attachment: imageUri });
        } catch (err) {
          console.error(err);
        }
      },
      error => console.log(error)
    );
  };

  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  renderImage() {
    return (
      <View>
        {this.state.attachment ? (
          <Image source={{ uri: this.state.attachment }} />
        ) : null}
      </View>
    );
  }

  onSend(messages = []) {
    this.socket.emit("message", messages[0]);
    this._storeMessages(messages);
  }

  connect(messages = []) {
    this.socket.emit("message", messages[0]);
    this._storeMessages(messages);
  }

  onBack = () => {
    this.setState({ attachment: null });
    this.rtc.sendMessage(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    );
    this.props.navigation.navigate("JoinKey");
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{textAlign: 'center'}}>Waiting for the connection to establish.</Text>
        </View>
      );
    } else {
      return (
        <ScrollView style={{ flex: 1, padding: 30 }}>
          <Button title="Back" onPress={this.onBack} />
          <Text style={{ textAlign: "center", marginBottom: 50, fontSize: 24 }}>
            Image currently shared with you:
          </Text>
          {this.state.image ? (
            <View>
              <Image
                style={{
                  width: 300,
                  height: 300,
                  resizeMode: "contain"
                }}
                source={{ uri: this.state.image }}
              />
            </View>
          ) : (
            <Text
              style={{ textAlign: "center", marginBottom: 50, fontSize: 16 }}
            >
              No image is currently being shared with you.
            </Text>
          )}
          <Text style={{ textAlign: "center", marginBottom: 50, fontSize: 24 }}>
            Image you are currently sharing:
          </Text>
          {this.state.attachment ? (
            <View>
              <Image
                style={{
                  width: 300,
                  height: 300,
                  resizeMode: "contain"
                }}
                source={{ uri: this.state.attachment }}
              />
            </View>
          ) : (
            <Text
              style={{ textAlign: "center", marginBottom: 50, fontSize: 16 }}
            >
              You are not currently sharing an image.
            </Text>
          )}
          <Button title="Send Image" onPress={this.addPicutre.bind(this)} />
          <Button title="Delete Image" onPress={this.deletePicture} />
          <View style={{ height: 150 }} />
        </ScrollView>
      );
    }
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });
  }
}