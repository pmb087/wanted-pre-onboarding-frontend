import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./SignUp.Style.js";

function SignUp() {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const BASE_URL =
    "http://ec2-3-38-135-202.ap-northeast-2.compute.amazonaws.com:8000";

  const handleInput = (event) => {
    const { value, name } = event.target;
    setInputValue({ ...inputValue, [`${name}`]: value });
  };

  const signUpValidation = (event) => {
    const { email, password } = inputValue;

    event.preventDefault();

    if (!email.includes("@") && password.length < 8) {
      return alert("이메일 형식 및 비밀번호 길이가 잘못되었습니다.");
    } else if (!email.includes("@")) {
      return alert("이메일의 형식이 잘못되었습니다.");
    } else if (password.length < 8) {
      return alert("비밀번호의 길이가 너무 짧습니다.");
    }

    fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.access_token);
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      });
  };

  return (
    <S.signUp>
      <S.signUpInner onSubmit={signUpValidation}>
        <S.signUpEmail
          type="email"
          name="email"
          required
          placeholder="이메일"
          onChange={handleInput}
        />
        <S.signUpPassword
          type="password"
          name="password"
          required
          placeholder="비밀번호"
          onChange={handleInput}
        />
        <S.signUpSubmit
          disabled={
            !(inputValue.email.includes("@") && inputValue.password.length > 7)
          }
        >
          회원가입
        </S.signUpSubmit>
      </S.signUpInner>
      <S.goToLogin>
        <S.goToLoginSubmit onClick={() => navigate("/")}>
          로그인
        </S.goToLoginSubmit>
      </S.goToLogin>
    </S.signUp>
  );
}

export default SignUp;
