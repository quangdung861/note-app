import { NoteAddOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLoaderData,
  useSubmit,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./noteList.css";

import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { deleteNote } from "../utils/noteUtils";

const NoteList = () => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const dropdownRef1 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target)
      ) {
        setIsShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { folder } = useLoaderData();
  console.log("🚀 ~ file: NoteList.jsx:52 ~ NoteList ~ folder:", folder);

  const { noteId, folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);

  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }

    if (folder?.notes?.[0]) {
      navigate(`note/${folder?.notes?.[0].id}`);
    } else {
      navigate(`/folders/${folderId}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, folder.notes]);

  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      { method: "post", action: `/folders/${folderId}` }
    );
  };

  const handleDeleteNote = async (id) => {
    const result = await deleteNote(id);
    if (result?.id) {
      // console.log(">>Success", result.id);
      // console.log(">>noteList", folder.notes);
      await folder.notes.forEach((item, index) => {
        if (item.id === result.id) {
          folder.notes.splice(index, 1); // Xoá 1 phần tử từ vị trí index
        }
      });
      // if (folder.notes.length === 0) {
      //   navigate(`/folders`)
      // }
      return navigate(`/folders/${folderId}`);
    }
  };

  return (
    <Grid container height="100%">
      <Grid
        className="note-list"
        item
        xs={4}
        sx={{
          width: "100%",
          maxWidth: "360px",
          bgcolor: "#F0EBE3",
          height: "100%",
          overflowY: "auto",
          padding: "10px",
          textAlign: "left ",
        }}
      >
        <List
          subheader={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
              <Tooltip title="Add Note" onClick={handleAddNewNote}>
                <IconButton size="small">
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {folder?.notes?.map(({ id, content, updatedAt }) => {
            const regex = /<p><\/p>/; // Biểu thức chính quy kiểm tra chuỗi "<p></p>"

            const result = regex.test(content); // Kiểm tra xem chuỗi có khớp với biểu thức không

            return (
              <div style={{ position: "relative" }} key={id}>
                <Link
                  to={`note/${id}`}
                  style={{ textDecoration: "none" }}
                  onClick={() => setActiveNoteId(id)}
                >
                  <Card
                    sx={{
                      mb: "5px",
                      bgcolor: id === activeNoteId ? "rgb(255 211 140)" : null,
                      position: "relative",
                    }}
                  >
                    <CardContent
                      sx={{
                        "&:last-child": { pb: "10px" },
                        padding: "10px",
                      }}
                    >
                      <div
                        className="title-note"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          marginBottom: "4px",
                          color:
                            content.length > 0 && !result ? "#333" : "#7a7a7a",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: `${
                            content.length > 0 && !result
                              ? content.substring(0, 30)
                              : "Trống"
                          }`,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}
                      >
                        {format(new Date(updatedAt), "EEEE dd/MM/yyyy HH:mm ", {
                          locale: vi,
                        })}
                      </Typography>
                    </CardContent>
                    <MoreHorizIcon
                      className="btn-note-dropdown"
                      fontSize="small"
                      style={{
                        position: "absolute",
                        right: "0px",
                        bottom: 0,
                        color: isShowDropdown === id ? "#EB0014" : null,
                      }}
                      onClick={() => setIsShowDropdown(id)}
                    />
                  </Card>
                </Link>
                {isShowDropdown === id && (
                  <div
                    className="dropdown-container"
                    ref={dropdownRef1}
                    onClick={() => handleDeleteNote(id)}
                  >
                    <DeleteOutlineIcon sx={{ color: "#fff" }} />
                  </div>
                )}
              </div>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8} style={{ backgroundColor: "#fff" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default NoteList;
