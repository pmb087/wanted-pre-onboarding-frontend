import styled from "styled-components";

export const toDo = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

export const toDoInner = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  top: 20vh;
  left: calc(50% - 392px / 2);
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-shadow: 0 0 0.3rem 0.05rem #cccccc;
`;

export const toDoHeader = styled.h1`
  margin-bottom: 1rem;
  font-weight: bolder;
  font-size: 2rem;
`;

export const toDoCreateWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 350px;
`;

export const toDoCreateinput = styled.input`
  padding: 0 10px;
  width: 250px;
  height: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

export const toDoCreateButton = styled.button`
  padding: 0 5px;
  width: 20%;
  height: 40px;
  background-color: #11aaaa;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 0.8rem;

  :hover {
    background-color: #d0d0d0;
    color: #11aaaa;
    font-weight: 500;
  }
`;
