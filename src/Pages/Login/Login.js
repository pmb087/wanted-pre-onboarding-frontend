import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Login.Style.js";
import { API } from "../../config.js";

function Login() {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todo");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (event) => {
    const { value, name } = event.target;
    setInputValue({ ...inputValue, [`${name}`]: value });
  };

  const loginValidation = (event) => {
    const { email, password } = inputValue;

    event.preventDefault();

    if (!email.includes("@") && password.length < 8) {
      return alert("이메일 형식 및 비밀번호 길이가 잘못되었습니다.");
    } else if (!email.includes("@")) {
      return alert("이메일의 형식이 잘못되었습니다.");
    } else if (password.length < 8) {
      return alert("비밀번호의 길이가 너무 짧습니다.");
    }

    fetch(API.LOGIN, {
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
        if (res.message === "해당 사용자가 존재하지 않습니다.") {
          return alert(res.message);
        }
        localStorage.setItem("token", res.access_token);
        alert("로그인이 완료되었습니다.");
        navigate("/todo");
      });
  };

  return (
    <S.login>
      <S.loginInner onSubmit={loginValidation}>
        <S.loginEmail
          type="email"
          name="email"
          value={inputValue.email}
          required
          placeholder="이메일"
          onChange={handleInput}
        />
        <S.loginPassword
          type="password"
          name="password"
          value={inputValue.password}
          required
          placeholder="비밀번호"
          onChange={handleInput}
        />
        <S.loginSubmit
          disabled={
            !(inputValue.email.includes("@") && inputValue.password.length > 7)
          }
        >
          로그인
        </S.loginSubmit>
      </S.loginInner>
      <S.goToSignUp>
        <S.goToSignUpSubmit onClick={() => navigate("/signup")}>
          회원가입
        </S.goToSignUpSubmit>
      </S.goToSignUp>
    </S.login>
  );
}

export default Login;
