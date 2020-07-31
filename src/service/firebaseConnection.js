/* Função do arquivo

Fazer conexão com o firebase

*/


import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyA3EtjGrbgfQoe5Kp3knEvJKINB1cnyHOE",
    authDomain: "meuapp-41333.firebaseapp.com",
    databaseURL: "https://meuapp-41333.firebaseio.com",
    projectId: "meuapp-41333",
    storageBucket: "meuapp-41333.appspot.com",
    messagingSenderId: "649406302548",
    appId: "1:649406302548:web:3acaa6faf7be197bb960c1",
    measurementId: "G-GXX12YTJ4L"
  };
  if(!firebase.apps.length){
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

export default firebase;
  