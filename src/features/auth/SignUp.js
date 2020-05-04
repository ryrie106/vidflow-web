import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, InputItem, Toast } from "antd-mobile";
import { fetchSignUp } from "features/auth/authSlice";
import PrevNavBar from "components/PrevNavBar";

import { PATH_SIGNIN } from "utils/constants";
import "./SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState(0);

  const dispatch = useDispatch();
  let history = useHistory();
  const signUpRef = useRef();
  const signUpButtonRef = useRef();

  function scrollDown(h) {
    if (height < h) {
      let offset = h - height;
      signUpRef.current.style.height = "calc(100vh + " + offset + "px)";
      window.scrollTo(0, offset);
    }
  }

  function scrollUp() {
    window.scrollTo(0, 0);
    signUpRef.current.style.height = "100vh";
  }

  // 가입 정보 작성시 키보드로 인해 입력창이 가려지는 것을 방지
  function onFocus(height) {
    return () => {
      setTimeout(() => {
        setHeight(document.getElementById("signup-button").offsetTop);
        scrollDown(height);
      }, 400);
    };
  }

  function onBlur() {
    scrollUp();
  }

  function onSubmit(e) {
    e.preventDefault();
    const request = {
      email,
      name,
      password,
    }
    try {
      dispatch(fetchSignUp(request));
      history.push(PATH_SIGNIN);
      Toast.info("회원가입 성공!, 로그인 해주세요", 1);
    } catch (err) {
      Toast.fail("회원가입 실패!", 1);
    }
  }

  return (
    <div className="signup" ref={signUpRef}>
      <PrevNavBar />
      <div className="signup-logo">
        <div className="signup-logo-name">V</div>
      </div>
      <div className="signup-title">Create an account</div>
      <div className="signup-input">
        <InputItem
          className="signup-input-item"
          placeholder="로그인 아이디로 사용됩니다"
          onFocus={onFocus(220 + 90)}
          onBlur={onBlur}
          value={email}
          onChange={(e) => setEmail(e)}
        >
          이메일
        </InputItem>

        <InputItem
          className="signup-input-item"
          type="password"
          placeholder="6-20자"
          onFocus={onFocus(220 + 135)}
          onBlur={onBlur}
          value={password}
          onChange={(e) => setPassword(e)}
        >
          비밀번호
        </InputItem>

        <InputItem
          className="signup-input-item"
          placeholder="3-10자"
          onFocus={onFocus(220 + 180)}
          onBlur={onBlur}
          value={name}
          onChange={(e) => setName(e)}
        >
          이름
        </InputItem>
        <div id="signup-login-instead">
          <Link to={PATH_SIGNIN}>로그인하기</Link>
        </div>
      </div>

      <Button id="signup-button" type="primary" onClick={onSubmit}>
        회원가입
      </Button>
    </div>
  );
}
export default SignUp;
