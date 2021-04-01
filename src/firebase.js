// 여기서 잠깐!
// firebase console(파이어베이스 대시보드)에서 프로젝트를 만들고 -> firestore를 만들어주고 시작해야해요! :)
// 아참, 앱 등록하기도 잊지마세요!
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAko9bgN93n0n4wIQy-nZt17bGKQr-QgVM",
    authDomain: "new-words-dictionary.firebaseapp.com",
    projectId: "new-words-dictionary",
    storageBucket: "new-words-dictionary.appspot.com",
    messagingSenderId: "6150827760",
    appId: "1:6150827760:web:1f1f015335ec76b0b0dc35",
    measurementId: "G-4X7CY0HCV9"
  
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
