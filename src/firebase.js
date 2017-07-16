import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBRyFb7pWHmyxttmknddBAIEW5YyfcAQmY",
    authDomain: "goalreactapp.firebaseapp.com",
    databaseURL: "https://goalreactapp.firebaseio.com",
    projectId: "goalreactapp",
    storageBucket: "goalreactapp.appspot.com",
    messagingSenderId: "863895723773"
  };

export const firebaseApp = firebase.initializeApp(config);
