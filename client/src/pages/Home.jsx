import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import { Outlet, useLoaderData } from "react-router-dom";
import PushNotification from "../components/PushNotification";

const Home = () => {
  const { folders } = useLoaderData();

  return (
    <div
      className="home-page"
      style={{
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        padding: "0 24px 50px",

      }}
    >
      <Typography variant="h4" sx={{ mb: "20px", mt: "50px", color: "#fff" }}>
        SỔ GHI CHÚ
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right", mb: "10px", gap: "8px" }}>
        <UserMenu />
        <PushNotification />
      </Box>
      <Grid
        container
        sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          overflow: "hidden",
          borderRadius: "6px",
        }}
      >
        <Grid item xs={3} sx={{ height: "50vh", width: "100%" }}>
          <FolderList folders={folders} />
        </Grid>
        <Grid item xs={9} sx={{ height: "50vh" }}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
