import firebase from "firebase/app";
import "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCj_W9jLY8IdyqYZZeoVLjCVFJX_EQEdPU",
  authDomain: "voosh-siva.firebaseapp.com",
  projectId: "voosh-siva",
  storageBucket: "voosh-siva.appspot.com",
  messagingSenderId: "684716659627",
  appId: "1:684716659627:web:5068cc63a5809f06d6f8ee",
  measurementId: "G-340MLP0NF1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
