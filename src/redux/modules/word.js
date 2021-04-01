// word.js

import { firestore } from "../../firebase";

/**
 * 액션 타입을 정해주고,
 * 액션 생성자를 만들고,
 * 리듀서를 만들어줘요!
 *
 * 그리고 나면, configureStore.js에서 rootReducer로 묶어주고 -> 미들웨어랑 엮어서 -> 스토어를 만들어줍니다.
 *
 * 파이어베이스 연결할 때는?
 *  - 중간다리 역할을 할 함수를 만들고,
 *  - 파이어스토어에 데이터를 추가하거나, 가져오는 등 비동기 요청을 보낸 다음,
 *  - 응답을 받으면 액션을 디스패치 해줍니다. 우리 리덕스 내 값을 변경할 수 있도록요!(.then에서 해야겠죠!)
 */

// Actions
const LOAD = "word/LOAD";
const CREATE = "word/CREATE";

// wordList에 있던 가짜 데이터를 initialState로 옮겨옵니다.
const initialState = {
  word_list: [],
};
// Action Creators
export const loadWord = (word_list) => {
  return { type: LOAD, word_list };
};

export const createWord = (word) => {
  return { type: CREATE, word };
};

export const getWordListFB = () => {
  return function (dispatch) {
    //   파이어스토어에서 word라는 콜렉션을 선택해줍니다. (콜렉션 이름은 편하신 이름으로 해도 ok!)
    const wordDB = firestore.collection("word");

    wordDB.get().then((docs) => {

        // 파이어스토어에서 가져온 데이터를 넣을, 빈 배열을 하나 만들어요.
        const new_word_list = [];

        // 반복문을 돌리면서 하나씩 new_word_list에 넣어줄거예요.
        docs.forEach(doc => {
            // 배열에 넣을 데이터를 예쁘게 만들어봅시다.
            // doc.data()에는 id가 포함되지 않으니, id는 doc.id에서 가져와요.
            const _word = {...doc.data(), id: doc.id}

            // 배열에 데이터를 추가하기
            new_word_list.push(_word);
        })

        // 액션을 디스패치해줍니다. (이제 리듀서를 통해 리덕스에 있는 값에도 파이어스토어에서 가져온 리스트를 넣어줄 수 있어요!)
        dispatch(loadWord(new_word_list));
    })
  };
};

export const addWordFB = (word) => {
  return function (dispatch) {
    //   파이어스토어에서 word라는 콜렉션을 선택해줍니다. (콜렉션 이름은 편하신 이름으로 해도 ok!)
    const wordDB = firestore.collection("word");

    wordDB.add(word).then((doc) => {
      // 우리가 추가 요청한 데이터가 잘 추가되었나 아래 주석을 풀고 확인해봐요!
      // console.log(doc);

      // 이제 id는 우리가 임의로 지정해준 가짜 아이디가 아니라, 진짜 데이터베이스에 추가된 아이디로 가져와서 넣어줘요.
      const new_word = { ...word, id: doc.id };

      // 액션을 디스패치 해줍니다. (이제 리듀서를 통해 리덕스에 있는 값에도 추가해줄 수 있겠죠!)
      dispatch(createWord(new_word));
    });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "word/LOAD":
    
    // 받아온 데이터(action.word_list)를 state에 넣어줘요. (state를 갈아끼워줘요!)
      return {...state, word_list: action.word_list};

    case "word/CREATE":
      // 받아온 데이터를 추가한 새 리스트 만들기
      const new_word_list = [...state.word_list, action.word];

      //   state를 갈아끼워요
      return { ...state, word_list: new_word_list };

    default:
      return state;
  }
}
