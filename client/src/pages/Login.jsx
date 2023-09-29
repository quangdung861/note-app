import React, { useContext } from "react";
import { Typography, Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { graphQLRequest } from "../utils/request";

const Login = () => {
  const auth = getAuth();
  // const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    const { data } = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log("variables >>> ", { data });
  };

  if (localStorage.getItem("accessToken")) {
    // navigate("/");
    return <Navigate to="/" />;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          width: "50%",
          height: "50%",
          top: "25%",
          left: "25%",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "10px", color: "white" }}>
          SỔ GHI CHÚ
        </Typography>
        <Button variant="contained" onClick={handleLoginWithGoogle}>
          Đăng nhập bằng Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
