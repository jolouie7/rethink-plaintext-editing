import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

import css from "./style.css";

function PlaintextEditor({ file, write }) {
  const [value, setValue] = useState("");
  // console.log(file, write, text);

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  // console.log(write)
  // const handleClick = () => {
  //   console.log("CLICK ME")
  // }

  const handleChange = (e) => {
    setValue(e.target.value)
    // * update the contents in the previewer when the input changes each time
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    write(file, value)
  }

  return (
    <div className={css.editor}>
      <h3>{file.name}</h3>
      <i>text/plain</i>
      <form onSubmit={handleSubmit}>
        <textarea
          className={css.textarea}
          value={value}
          onChange={handleChange}
          name="textarea"
          rows="10"
          cols="50"
        />
        <br/>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
