import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("hussainToken")) {
      return navigate("/login");
    }
  });

  return <Box>{children}</Box>;
};

export default AuthWrapper;
