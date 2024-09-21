import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardHeader,
  Avatar,
} from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import CustomStepper from "../shared/CustomStepper";
import axiosInstance from "../../config/axios";

interface StatusCardProps {
  id: number;
  name: string;
  description: string;
  photo: string;
  buttonText: string;
  onButtonClick: () => void;
  isAdmin?: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({
  id,
  name,
  description,
  photo,
  buttonText,
  onButtonClick,
  isAdmin = false,
}) => {
  const [status, setStatus] = useState<string>("Pending"); // default is 'Pending'

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axiosInstance.get(`/voter-apply-status/${id}`);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStatus();
  }, [id]);

  return (
    <Card
      sx={{
        p: 1.5,
        borderRadius: "10px",
        width: "100%",
        transition: "0.3s all ease-in-out",
        // cursor: "pointer",
        // "&:hover": {
        //   bgcolor: "rgba(255, 255, 255, 0.30)",
        // },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          height: "100%",
          borderRadius: "5px",
          background: "rgba(0, 0, 0, 0.40)",
          p: 1,
        }}
      >
        <Box sx={{ width: "40%", height: "100%" }}>
          <img
            src={photo}
            alt={"image"}
            style={{
              width: "100%",
              borderRadius: "5px",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={{ width: "60%", height: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <CardHeader
              sx={{
                px: 0,
                py: 0.5,
              }}
              avatar={
                <Avatar
                  aria-label="logo"
                  sx={{
                    bgcolor: "primary.main",
                    width: 40,
                    height: 40,
                  }}
                >
                  {name[0]}
                </Avatar>
              }
              title={name}
            />
          </Box>
          <Typography
            variant="subtitle2"
            mb={2}
            color="text.secondary"
            sx={{
              whiteSpace: "pre-wrap",
            }}
          >
            {description}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Approval Status
            </Typography>
            <CustomStepper status={status} isAdmin={isAdmin} />
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={onButtonClick}
            startIcon={<OpenInNew />}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default StatusCard;
