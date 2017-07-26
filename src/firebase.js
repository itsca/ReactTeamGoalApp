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
export const  usersRef = firebase.database().ref('appUsers');
export const  teamsRef = firebase.database().ref('teams');
export const  goalRef = firebase.database().ref('goals');
export const  completeGoalRef = firebase.database().ref('completeGoals');
