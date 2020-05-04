import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, InputItem, Toast } from "antd-mobile";
import { fetchSignIn, fetchCurrentUser } from "features/auth/authSlice";
import PrevNavBar from "components/PrevNavBar";
import "./SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState(0);
  const signInRef = useRef();
  let history = useHistory();
  const dispatch = useDispatch();

  // 로그인 정보 작성시 키보드로 인해 입력창이 가려지는 것을 방지
  function onFocus(height) {
    return () => {
      setTimeout(() => {
        setHeight(document.getElementById("login-button").offsetTop);
        scrollDown(height);
      }, 400);
    };
  }

  function onBlur() {
    scrollUp();
  }

  function scrollDown(h) {
    if (height < h) {
      let offset = h - height;
      signInRef.current.style.height = "calc(100vh + " + offset + "px)";
      window.scrollTo(0, offset);
    }
  }

  function scrollUp() {
    window.scrollTo(0, 0);
    signInRef.current.style.height = "100vh";
  }

  async function onSubmit() {
    const request = {
      email,
      password
    };
    try {
      await dispatch(fetchSignIn(request));
      await dispatch(fetchCurrentUser());
      await history.push("/");
    } catch (err) {
      Toast.fail("로그인 실패!", 1);
    }
  }

  return (
    <div className="login" ref={signInRef}>
      <PrevNavBar />
      <div id="login-logo">
        <div id="login-logo-name">V</div>
      </div>
      <div id="login-title">Login to Vidflow </div>
      <div id="login-input">
        <InputItem
          className="login-input-item"
          placeholder="이메일 주소를 입력하세요"
          onFocus={onFocus(220 + 90)}
          onBlur={onBlur}
          value={email}
          onChange={(e) => setEmail(e)}
        >
          이메일
        </InputItem>

        <InputItem
          className="login-input-item"
          placeholder="비밀번호를 입력하세요"
          type="password"
          onFocus={onFocus(220 + 135)}
          onBlur={onBlur}
          value={password}
          onChange={(e)=> setPassword(e)}
        >
          비밀번호
        </InputItem>
        <div id="login-signup-instead">
          <Link to="/signup">회원가입하기</Link>
        </div>
      </div>
      <Button id="login-button" type="primary" onClick={onSubmit}>
        로그인
      </Button>
    </div>
  );
}

export default SignIn;
