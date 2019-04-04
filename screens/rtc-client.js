import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices
  } from "react-native-webrtc";
  import { EventEmitter } from "eventemitter3";
  export class Signaling extends EventEmitter {
    constructor(socket) {
      super();
      this.socket = socket;
      socket.on("ice", msg => this.emit("ice", msg));
      socket.on("offer", msg => this.emit("offer", msg));
      socket.on('answer', msg => this.emit('answer', msg));
    }
  
    send(type, message) {
      console.log("Signaling.send", type, message);
      this.socket.emit(type, message);
    }
  
    _handleCandidate = message => {};
  
    teardown() {}
  }
  
  const config = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
  };
  
  const dataChannelSettings = {
    reliable: {
      ordered: true
    }
  };
  
  const labels = Object.keys(dataChannelSettings);
  
  export class RTCClient extends EventEmitter {
    constructor(signaling, caller) {
        super();
        this.caller = caller;
      this.pendingDataChannels = {};
      this.dataChannels = {};
      this.signaling = signaling;
      this.listen();
    }
  
    async start(){
        await this.createPeerConnection();
    }
  
    sendMessage = message => {
        this.dataChannels.reliable.send(message);
    }
  
    listen() {
      console.log("listen", this.caller);
      this.signaling.on("ice", this.onIceSignal);
        this.signaling.on("answer", this.onAnswerSignal);
        this.signaling.on("offer", this.onOfferSignal);
      
    }
  
    onAnswerSignal = async event => {
      console.log("onAnswerSignal", event);
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(event)
      );
    };
  
    onOfferSignal = async event => {
        console.log('onOfferSignal', event);
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(event)
      );
      let answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.signaling.send("answer", answer);
    };
  
    onIceSignal = async event => {
      console.log("onIceSignal", event);
      if (event) {
        try {
          let candidate = new RTCIceCandidate(event);
          console.log('onIceSignal', candidate);
          await this.peerConnection.addIceCandidate(candidate);
        } catch (err) {
          console.error(err);
        }
      }
    };
  
    onicegatheringstatechange = event => {
        console.log('onicegatheringstatechange', event);
    }
  
    oniceconnectionstatechange = event => {
        console.log('oniceconnectionstatechange', event);
    }
  
    async createPeerConnection() {
      console.log("createPeerConnection");
      this.peerConnection = new RTCPeerConnection(config);
      this.peerConnection.onicecandidate = this.onicecandidate;
      this.peerConnection.oniceconnectionstatechange = this.oniceconnectionstatechange;
      this.peerConnection.onicegatheringstatechange = this.onicegatheringstatechange;
      if (this.caller) {
          await this.createDataChannels();
  
        await this.createOffer();
      }else{
          this.peerConnection.ondatachannel = this.onDataChannel;
      }
    }
  
    onicecandidate = event => {
      console.log("onicecandidate", event);
      if (event.candidate) {
        this.signaling.send("ice", event.candidate);
      }
    };
  
    async createOffer() {
      console.log("createOffer");
      let offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      this.signaling.send('offer', offer);
    }
  
    onDataChannel = event => {
        console.log('onDataChannel', event);
        var channel = event.channel;
        this.pendingDataChannels[channel.label] = channel;
        channel.binaryType = 'arraybuffer';
        channel.onopen = this.onChannelOpen(channel.label, channel);
        channel.onmessage = this.onChannelMessage;
        channel.onclose = this.onChannelClose;
        channel.onerror = this.onChannelError;
    }
  
    async createDataChannels() {
      console.log("createDataChannels");
      for (let label of labels) {
        let channelOptions = dataChannelSettings[label];
        let channel = (this.pendingDataChannels[
          label
        ] = this.peerConnection.createDataChannel(label, channelOptions));
        channel.binaryType = "arraybuffer";
        channel.onopen = this.onChannelOpen(label, channel);
        channel.onmessage = this.onChannelMessage;
        channel.onclose = this.onChannelClose;
        channel.onerror = this.onChannelError;
      }
    }
  
  //   not needed, but may be useful depending on description requirements for SDP
  //   async setLocalDescription(description) {
  //     console.log("createLocalDescription");
  //     let sessionDescription = new RTCSessionDescription(description);
  //     await this.peerConnection.setLocalDescription(sessionDescription);
  //     console.log(
  //       "createLocationDescription",
  //       sessionDescription.type,
  //       sessionDescription.sdp
  //     );
  //     this.signaling.send("answer", sessionDescription);
  //   }
  
    onChannelError(error) {
      console.log("channel error", error);
    }
    onChannelClose() {
      console.log("channel close");
    }
    onChannelOpen = (label, channel) => {
      return () => {
          console.log("channel open", label, channel);
          this.dataChannels[label] = channel;
          delete this.pendingDataChannels[label];
          this.emit('ready');
      };
      
    }
    onChannelMessage = (event) => {
      console.log("channel event", event);
      let data = event.data;
      this.emit('dataMessage', data);
    }
  }