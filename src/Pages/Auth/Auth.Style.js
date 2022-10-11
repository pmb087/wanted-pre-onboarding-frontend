import styled from "styled-components";

export const auth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
`;

export const authInner = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-shadow: 0 0 0.3rem 0.05rem #cccccc;
`;

export const authEmail = styled.input`
  margin: 20px 20px 10px;
  padding: 10px;
  width: 200px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border: 1px solid #00a0a0;
  }
`;

export const authPassword = styled(authEmail)`
  margin: 10px 20px;
`;

export const authPasswordValidation = styled(authPassword)``;

export const authSubmit = styled.button`
  margin: 10px 20px 20px;
  width: 200px;
  height: 30px;
  background-color: #00a0a0;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;

  &:disabled {
    opacity: 0.5;
  }
`;

export const goToSignUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-shadow: 0 0 0.3rem 0.05rem #cccccc;
`;

export const goToSignUpSubmit = styled(authSubmit)`
  background-color: #007070;
  margin: 15px 20px;
`;
