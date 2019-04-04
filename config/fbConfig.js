import firebase from "firebase";

var config = {
  apiKey: "AIzaSyC4-pdJAK06MxAPizTKYqgosn4HVLeuFR8",
  authDomain: "nihs-research-d0515.firebaseapp.com",
  databaseURL: "https://nihs-research-d0515.firebaseio.com",
  projectId: "nihs-research-d0515",
  storageBucket: "",
  messagingSenderId: "647889021294"
};
firebase.initializeApp(config);

export default firebase;