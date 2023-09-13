import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDp_RlSKGFc0uDAcDOR--CdZ2_l2V2caxQ",
  authDomain: "online-exam-app-af9bb.firebaseapp.com",
  databaseURL:"https://online-exam-app-af9bb-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "online-exam-app-af9bb",
  storageBucket: "online-exam-app-af9bb.appspot.com",
  messagingSenderId: "620596305313",
  appId: "1:620596305313:web:91fc79eb01e52d2e3a7fe0",
};


let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app()
};

export {firebase}