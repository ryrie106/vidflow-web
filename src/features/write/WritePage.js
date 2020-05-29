import React, { useState } from "react";
import Write from "./Write";
import VideoEdit from "./VideoEdit";
import { useHistory } from "react-router";
import "./WritePage.css";

function WritePage() {
  const WRITE_STAGE = {
    EDIT: "edit",
    WRITE: "write"
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [stage, setStage] = useState(WRITE_STAGE.EDIT);

  let history = useHistory();
  // const { account } = useSelector((state) => state.auth);

  let rendered;
  if (stage === WRITE_STAGE.EDIT) {
    rendered = (
      <VideoEdit
        setSelectedFile={setSelectedFile}
        setThumbnail={setThumbnail}
        setPreview={setPreview}
        gotoMain={gotoMain}
        gotoWrite={gotoWrite}
      />
    );
  } else if (stage === WRITE_STAGE.WRITE) {
    rendered = (
      <Write
        selectedFile={selectedFile}
        thumbnail={thumbnail}
        preview={preview}
        gotoMain={gotoMain}
        gotoEdit={gotoEdit}
      />
    );
  }

  function gotoWrite() {
    setStage(WRITE_STAGE.WRITE);
  }

  function gotoEdit() {
    setStage(WRITE_STAGE.EDIT);
  }

  function gotoMain() {
    history.push("/");
  }
  return <div className="write-page">{rendered}</div>;
}

export default WritePage;
