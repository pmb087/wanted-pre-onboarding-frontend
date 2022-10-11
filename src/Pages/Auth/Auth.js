import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../config.js";
import * as S from "./Auth.Style.js";

function Auth() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    passwordValidation: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  const authMode = params.auth;

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

  const goToOtherAuth = () => {
    authMode === "login" ? navigate("/auth/signup") : navigate("/auth/login");
  };

  const authValidation = (event) => {
    const { email, password, passwordValidation } = inputValue;

    event.preventDefault();

    if (!email.includes("@") && password.length < 8) {
      return alert("이메일 형식 및 비밀번호 길이가 잘못되었습니다.");
    } else if (!email.includes("@")) {
      return alert("이메일의 형식이 잘못되었습니다.");
    } else if (password.length < 8) {
      return alert("비밀번호의 길이가 너무 짧습니다.");
    } else if (authMode === "signup" && password !== passwordValidation) {
      return alert("비밀번호가 서로 일치하지 않습니다.");
    }

    fetch(authMode === "login" ? API.LOGIN : API.SIGNUP, {
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
        if (res.message === "동일한 이메일이 이미 존재합니다.") {
          return alert(res.message);
        } else if (res.message === "해당 사용자가 존재하지 않습니다.") {
          return alert(res.message);
        }
        localStorage.setItem("token", res.access_token);
        authMode === "login"
          ? alert("로그인이 완료되었습니다.")
          : alert("회원가입이 완료되었습니다.");
        navigate("/todo");
      });
  };

  const buttonDisabled =
    authMode === "signup"
      ? !(
          inputValue.email.includes("@") &&
          inputValue.password.length > 7 &&
          inputValue.password === inputValue.passwordValidation
        )
      : !(inputValue.email.includes("@") && inputValue.password.length > 7);

  return (
    <S.auth>
      <S.authInner onSubmit={authValidation}>
        <S.authEmail
          type="email"
          name="email"
          value={inputValue.email}
          required
          placeholder="이메일"
          onChange={handleInput}
          autoComplete="current-email"
        />
        <S.authPassword
          type="password"
          name="password"
          value={inputValue.password}
          required
          placeholder="비밀번호"
          onChange={handleInput}
          autoComplete="current-password"
        />
        {authMode === "signup" && (
          <S.authPasswordValidation
            type="password"
            name="passwordValidation"
            value={inputValue.passwordValidation}
            required
            placeholder="비밀번호확인"
            onChange={handleInput}
            autoComplete="current-password"
          />
        )}
        <S.authSubmit disabled={buttonDisabled}>
          {authMode === "login" ? "로그인" : "회원가입"}
        </S.authSubmit>
      </S.authInner>
      <S.goToSignUp>
        <S.goToSignUpSubmit onClick={goToOtherAuth}>
          {authMode === "login" ? "회원가입" : "로그인"}
        </S.goToSignUpSubmit>
      </S.goToSignUp>
    </S.auth>
  );
}

export default Auth;
