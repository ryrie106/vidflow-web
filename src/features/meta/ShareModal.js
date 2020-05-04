import React from "react";
import { Modal } from "antd-mobile";


function ShareModal(props) {
  function showAlert() {
    Modal.alert("삭제", "정말로 삭제하시겠습니까", [
      { text: "Cancel", onPress: () => {}, style: "default" },
      {
        text: "OK",
        onPress: () => {
          deletePost(this.state.currentPostId).then(response => {
            if (response.success) window.location.reload();
            else Toast.fail(response.message, 1);
          });
        }
      }
    ]);
  }
  return (
    <Modal
      popup
      visible={this.state.shareModal}
      onClose={this.closeModal("shareModal")}
      animationType="slide-up"
      afterClose={() => {}}
    >
      <div>
        {this.props.currentUser &&
        this.props.currentUser.id === this.state.currentPostWriterId ? (
          <Button onClick={this.showAlert}>삭제</Button>
        ) : (
          <div>공유하기(미지원)</div>
        )}
      </div>
    </Modal>
  );
}

export default ShareModal;
