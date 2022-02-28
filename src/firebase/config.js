import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDAwEi9ft6dZUUZ4ZtfMQi0kNqc1hTKS74',
    authDomain: 'fir-101-29e62.firebaseapp.com',
    databaseURL: 'https://fir-101-29e62-default-rtdb.asia-southeast1.firebasedatabase.app/',
    projectId: 'fir-101-29e62',
    storageBucket: 'gs://fir-101-29e62.appspot.com/',
    messagingSenderId: '775135513513',
    appId: '1:775135513513:android:e48e8f8aa571838e8192b8',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };