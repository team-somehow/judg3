import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useMagic } from "../auth/magic/MagicContext";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const { setAddress, setToken } = useAuth();
  const { magic } = useMagic();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    const fetchData = async () => {
      console.log(
        "address, token",
        localStorage.getItem("address"),
        localStorage.getItem("token")
      );

      if (!magic) return console.error("Magic not initialized");

      if (
        !localStorage.getItem("address") ||
        (!localStorage.getItem("token") && pathname !== "/")
      )
        return navigate("/login");
      setAddress(localStorage.getItem("address")!);
      setToken(localStorage.getItem("token")!);
    };
    fetchData();
  }, [magic, navigate, pathname, setAddress, setToken]);

  return <Box>{children}</Box>;
};

export default AuthWrapper;
