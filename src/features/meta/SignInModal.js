import React from "react";
import { Button, Modal } from "antd-mobile";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { closeSignInModal } from "features/meta/metaSlice";
import { PATH_SIGNUP, PATH_SIGNIN } from "utils/constants";
import "./SignInModal.css";

function SignInModal() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { signInModal } = useSelector((state) => state.meta);

  return (
    <Modal
      popup
      visible={signInModal}
      onClose={() => dispatch(closeSignInModal())}
      animationType="slide-up"
      afterClose={() => {}}
    >
      <div className="signin-modal">
        계속하려면 Vidflow 계정이 필요합니다.
        <Button
          type="warning"
          onClick={() => {
            dispatch(closeSignInModal());
            history.push(PATH_SIGNUP);
          }}
        >
          회원가입
        </Button>
        <Button
          className="redirect-to-signin"
          onClick={() => {
            dispatch(closeSignInModal());
            history.push(PATH_SIGNIN);
          }}
        >
          이미 계정이 있으신가요? 로그인
        </Button>
      </div>
    </Modal>
  );
}

export default SignInModal;
