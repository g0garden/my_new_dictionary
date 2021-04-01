// 여기서 잠깐!
// firebase console(파이어베이스 대시보드)에서 프로젝트를 만들고 -> firestore를 만들어주고 시작해야해요! :)
// 아참, 앱 등록하기도 잊지마세요!
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
   //config 정보 입력
  
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
