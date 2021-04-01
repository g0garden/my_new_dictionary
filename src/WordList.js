import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getWordListFB } from "./redux/modules/word";

const WordList = (props) => {
  // 디스패치부터 만들어줍니다.
  const dispatch = useDispatch();

  //   리덕스에 있는 데이터를 가져와요!
  const word_list = useSelector((state) => state.word.word_list);

  //   useEffect의 2번째 파라미터(여기서는 빈배열([])이죠!)가 빈 배열이면 컴포넌트가 처음 렌더링 되었을 때만 실행한다는 뜻이에요.
  //   조금 헷갈린다면, React hook useEffect <- 이렇게 검색해보기!
  React.useEffect(() => {
    // 리덕스에 있는 단어 목록이 하나도 없을 때만 파이어스토어에서 데이터를 가져오도록 했어요!
    if (word_list.length === 0) {
      dispatch(getWordListFB());
    }
  }, []);

  return (
    <React.Fragment>
            <Title  size="32px">oh, Hello Mate!</Title>
            <Title color="#f90b0b">Please, add your words.</Title>
            {word_list.map((w) => {
                return(
                <Card key={w.id}>
                    <Text margin="1px 0px" color="#4b505d" size="8px" underline>
                        Word
                    </Text>
                    <Text size="12px">: {w.word}</Text>
                    <Text margin="1px 0px" color="#4b505d" size="8px" underline>
                        Description
                    </Text>
                    <Text size="12px">: {w.desc}</Text>
                    <Text margin="1px 0px" color="#4b505d" size="8px" underline>
                        Example
                    </Text>
                    <Text color="#0b47f9" size="12px">: {w.example}</Text>
                </Card>
                );
            })}
            <AddButton onClick={() => {
                props.history.push("/write");
            }}>+</AddButton>
        </React.Fragment>
  );
};

export default WordList;

//스타일
const Title = styled.h1`
    width: 70vw;
    margin: 8px auto;
    font-size: ${(props) => (props.size ? `${props.size}`:"16px")};
    font-weight: bold;
    text-align: center;
    color : ${(props) => (props.color? `${props.color}`:"black")}; 
`;

const Card = styled.div`
    width: 70vw;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 16px 0px;
    margin : 8px auto;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 2px solid black;
    border-radius: 20px;
`;

const Text = styled.p`
    font-size: ${(props) => (props.size? `${props.size}`:"16px")};
    ${(props) => (props.underline? "text-decoration: underline;":"")}
    ${(props) => (props.color ? `color: ${props.color};` : "")};
    margin: ${(props)=>(props.margin? `${props.margin}`:"2px 0px")};
    padding: 0px 16px;
`;

const AddButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: black;
    color: white;
    font-size: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
      background-color:#f90b0b;
    }

`;
