import styled from "styled-components";

export const toDo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

export const toDoInner = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid #cccccc;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 0.3rem 0.05rem #cccccc;
`;

export const toDoHeader = styled.h1`
  font-weight: bolder;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const toDoListWrap = styled.div``;

export const TestButton = styled.button``;

export const toDoCreateWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const toDoCreateinput = styled.input`
  width: 70%;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

export const toDoCreateButton = styled.button`
  width: 20%;
  height: 40px;
  padding: 0 5px;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #11aaaa;

  :hover {
    background-color: #d0d0d0;
    color: #11aaaa;
    font-weight: 500;
  }
`;
