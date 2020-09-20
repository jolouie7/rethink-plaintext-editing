import React, { useState, useEffect } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import path from "path";
import classNames from "classnames";


import { listFiles } from "../lib/list-files";

// Used below, these need to be registered
import MarkdownEditor from "../MarkdownEditor";
import PlaintextEditor from "../components/PlaintextEditor";

import IconPlaintextSVG from "../public/icon-plaintext.svg";
import IconMarkdownSVG from "../public/icon-markdown.svg";
import IconJavaScriptSVG from "../public/icon-javascript.svg";
import IconJSONSVG from "../public/icon-json.svg";

import css from "./style.module.css";

const TYPE_TO_ICON = {
  "text/plain": IconPlaintextSVG,
  "text/markdown": IconMarkdownSVG,
  "text/javascript": IconJavaScriptSVG,
  "application/json": IconJSONSVG
};

function FilesTable({ files, activeFile, setActiveFile }) {
  return (
    <div className={css.files}>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr
              key={file.name}
              className={classNames(
                css.row,
                activeFile && activeFile.name === file.name ? css.active : ""
              )}
              onClick={() => setActiveFile(file)}
            >
              <td className={css.file}>
                <div
                  className={css.icon}
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type]
                  }}
                ></div>
                {path.basename(file.name)}
              </td>

              <td>
                {new Date(file.lastModified).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilesTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  activeFile: PropTypes.object,
  setActiveFile: PropTypes.func
};

function Previewer({ file }) {
  const [value, setValue] = useState("");

  const handleClick = () => {
    console.log("value in previewer: ",value)
  }

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.preview} onClick={handleClick}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>{value}</div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};

// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
  // "text/plain": PlaintextEditor,
  // "text/markdown": MarkdownEditor,
};

function PlaintextFilesChallenge() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [targetFile, setTargetFile] = useState({})
  const [fileText, setFileText] = useState("")
  // const [editorState, setEditorState] = React.useState(() =>
  //   EditorState.createEmpty()
  // );

  useEffect(() => {
    const files = listFiles();
    setFiles(files);
  }, []);

  // console.log("editor:", files[2])

  const write = (file, text) => {
    console.log("Writing... ", file.name);
    // Writing...  /plain.txt
    console.log("Writing Content... ", text);
    // Writing Content...  Just some text looking for an editor!!
    console.log("files... ", files);
    // TODO: Write the file to the `files` array

    let myFile = files.find(i => i.name === file.name)
    console.log("myFile: ", myFile)
    console.log("myFile name: ", myFile.name)
    console.log("plain: ", files[1])
    // myFile = {...myFile, text: text}
    // console.log("myFile After: ", myFile);
    // setTargetFile( myFile );
    setTargetFile(myFile)
    setFileText(text)
    console.log(targetFile)
    console.log(fileText)
    // * KEY PART: find a way to write to list-files.js and update target file(myFile)
    // const f = () => File([text], myFile.name, {
    //   type: myFile.type,
    //   lastModified: new Date(),
    // });
    // f()
  };

  const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;

  return (
    <div className={css.page}>
      <Head>
        <title>Rethink Engineering Challenge</title>
      </Head>
      <aside>
        <header>
          <div className={css.tagline}>Rethink Engineering Challenge</div>
          <h1>Seasoning Plaintext</h1>
          <div className={css.description}>
            Let{"'"}s have fun with files and JavaScript. What could be more fun
            than rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>

        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://rethink.software">Rethink Software</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email us at jobs@rethink.software
          </div>
        </footer>
      </aside>

      <main className={css.editorWindow}>
        {activeFile && (
          <>
            {PlaintextEditor && (
              <PlaintextEditor
                file={activeFile}
                write={write}
              />
            )}
            {!Editor && <Previewer file={activeFile} />}
          </>
        )}

        {!activeFile && (
          <div className={css.empty}>Select a file to view or edit</div>
        )}
      </main>
    </div>
  );
}

export default PlaintextFilesChallenge;
