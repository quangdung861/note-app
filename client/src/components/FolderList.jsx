import { Box, Card, CardContent, List, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NewFolder from "./NewFolder";
import "./folderList.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { deleteFolder } from "../utils/noteUtils";

const FolderList = ({ folders }) => {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const navigate = useNavigate();

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

  const handleDeleteFolder = async (id) => {
    const result = await deleteFolder(id);
    if (result?.id) {
      // console.log(">>Success", result.id);
      // console.log(">>noteList", folder.notes);
      await folders.forEach((item, index) => {
        if (item.id === result.id) {
          folders.splice(index, 1); // Xoá 1 phần tử từ vị trí index
        }
      });
      // if (folder.notes.length === 0) {
      //   navigate(`/folders`)
      // }
      return navigate(`/`);
    }
  };

  return (
    <List
      className="folder-list"
      sx={{
        bgcolor: "#7D9D9C",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
        borderTopLeftRadius: "6px",
        borderBottomLeftRadius: "6px",
      }}
      subheader={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folders
          </Typography>
          <NewFolder />
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <div style={{ position: "relative" }} key={id}>
            <Link
              to={`folders/${id}`}
              style={{ textDecoration: "none" }}
              onClick={() => setActiveFolderId(id)}
            >
              <Card
                sx={{
                  mb: "5px",
                  backgroundColor:
                    id === activeFolderId ? "rgb(255 211 140)" : null,
                  position: "relative",
                }}
              >
                <CardContent
                  sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
                    {name}
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
                onClick={() => handleDeleteFolder(id)}
              >
                <DeleteOutlineIcon sx={{ color: "#fff" }} />
              </div>
            )}
          </div>
        );
      })}
    </List>
  );
};

export default FolderList;
