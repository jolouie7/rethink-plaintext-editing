import React from "react";
import PropTypes from "prop-types";

import css from "./style.css";

function PlaintextEditor({ file, write, text }) {
  // console.log(file, write, text);
  console.log(write)
  const handleClick = () => {
    console.log("CLICK ME")
  }
  return (
    <div className={css.editor} onClick={handleClick}>
      <h3>{file.name}</h3>
      <i>text/plain</i>
      {/* <textarea></textarea> */}
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
