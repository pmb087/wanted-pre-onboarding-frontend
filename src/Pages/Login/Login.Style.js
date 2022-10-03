import styled from "styled-components";

export const login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

export const loginInner = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: white;
`;

export const loginEmail = styled.input`
  border: 1px solid black;
  font-size: 16px;
  margin: 10px;
  padding: 5px;
`;

export const loginPassword = styled.input`
  border: 1px solid black;
  font-size: 16px;
  margin: 10px;
  padding: 5px;
`;

export const loginSubmit = styled.button`
  background-color: black;
  color: white;
  width: 172px;
  padding: 5px;
  margin: 10px;

  &:disabled {
    opacity: 0.5;
  }
`;

export const goToSignUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  margin-top: 15px;
`;

export const goToSignUpSubmit = styled.button`
  color: white;
  background-color: black;
  width: 172px;
  padding: 5px;
  margin: 10px;
`;