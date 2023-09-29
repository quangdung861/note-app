import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  AtomicBlockUtils,
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {
  useLoaderData,
  useSubmit,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { debounce } from "@mui/material";

const Note = () => {
  const navigate = useNavigate();
  const { note } = useLoaderData();
  const submit = useSubmit();
  const location = useLocation();
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note?.content || "<p></p>");
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note?.id]);

  const [rawHTML, setRawHTML] = useState(note?.content);

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHTML, location.pathname]);

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note?.content) return;

      submit(
        { ...note, content: rawHTML },
        {
          method: "POST",
          action: pathname,
        }
      );
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRawHTML(note?.content);
  }, [note?.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      // placeholder="write something!"
      sx={{ height: "50vh" }}
    />
  );
};

export default Note;
