import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const { setAddress, setToken } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // console.log(
  //     //   "address, token",
  //     //   localStorage.getItem("address"),
  //     //   localStorage.getItem("token")
  //     // );

  //     if (
  //       !localStorage.getItem("address") ||
  //       (!localStorage.getItem("token") && pathname !== "/")
  //     )
  //       return navigate("/login");
  //     setAddress(localStorage.getItem("address")!);
  //     setToken(localStorage.getItem("token")!);
  //   };
  //   fetchData();
  // }, [navigate, pathname, setAddress, setToken]);
  if (!localStorage.getItem("token")) {
    return navigate("/login");
  }

  return <Box>{children}</Box>;
};

export default AuthWrapper;
