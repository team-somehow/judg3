import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Skeleton,
} from "@mui/material";
import { Link, Share } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../config/axios";
import Loading from "../ui/Loading";
import { useAuth } from "../../context/AuthContext";
import { useFlowInteraction } from "../../hooks/useFlowInteraction";
import useMorphInteractions from "../../hooks/morph/useInteractions";

type Props = {
  eventId: string;
  blockChainId: string;
};

interface Voter {
  voter_id: number;
  status: string;
}

const VoterDetails: React.FC<Props> = ({ eventId, blockChainId }) => {
  const [voters, setVoters] = useState<Voter[]>();
  const [loading, setLoading] = useState(true);
  const { currentAuthSupply } = useAuth();
  const { approveVoter } = useFlowInteraction();
  const { handleApproveVoterToEvent } = useMorphInteractions();

  useEffect(() => {
    const getVoters = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`voters/${eventId}`);
        console.log("Voters:", response.data);
        setVoters(response.data);
      } catch (error) {
        console.error("Error fetching voters:", error);
      } finally {
        setLoading(false);
      }
    };
    getVoters();
  }, [eventId]);

  // Handle accept
  const handleAccept = async (voterId: number, user_address: string) => {
    try {
      const response = await axiosInstance.post("/voters/update-status/", {
        event_id: Number(eventId), // Ensure event_id is a number
        voter_id: voterId,
        status: "Accepted",
      });
      console.log("Voter accepted:", response.data);
      // Update state to reflect the accepted status
      {
        currentAuthSupply === "magic" &&
          approveVoter({
            eventId: parseInt(blockChainId),
            voterAddress: user_address,
          });
      }
      {
        currentAuthSupply === "dynamic" &&
          handleApproveVoterToEvent({
            eventId: blockChainId,
            voterId: user_address,
          });
      }

      setVoters((prevVoters) =>
        prevVoters?.map((voter) =>
          voter.voter_id === voterId ? { ...voter, status: "Accepted" } : voter
        )
      );
    } catch (error) {
      console.error("Error accepting voter:", error);
    }
  };

  // Handle reject
  const handleReject = async (voterId: number) => {
    try {
      const response = await axiosInstance.post("/voters/update-status/", {
        event_id: Number(eventId), // Ensure event_id is a number
        voter_id: voterId,
        status: "Rejected",
      });
      console.log("Voter rejected:", response.data);
      // Update state to reflect the rejected status
      setVoters((prevVoters) =>
        prevVoters?.map((voter) =>
          voter.voter_id === voterId ? { ...voter, status: "Rejected" } : voter
        )
      );
    } catch (error) {
      console.error("Error rejecting voter:", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h5" fontWeight="500">
          Voter Details
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "rgba(255, 255, 255, 0.10)",
            p: 1,
            borderRadius: "5px",
          }}
        >
          <Link sx={{ mx: 1 }} />
          <Typography variant="body1" sx={{ mr: 2 }}>
            https://Judg3.web.app
          </Typography>
          <Button
            variant="contained"
            startIcon={<Share />}
            onClick={() => {
              navigator.clipboard.writeText("https://judg3.web.app");
              enqueueSnackbar("Link copied to clipboard", {
                variant: "success",
              });
            }}
          >
            Share Event
          </Button>
        </Box>
      </Box>
      <Divider />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {loading ? (
          <Box>
            <Skeleton variant="rectangular" width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={100} />
          </Box>
        ) : voters ? (
          voters.map((voter, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ display: "flex", alignItems: "center" }}>
                <CardContent
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <Avatar sx={{ bgcolor: "purple", mr: 2 }}>{index + 1}</Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      Voter Id - {voter.voter_id}
                    </Typography>
                  </Box>
                  <Box>
                    {voter.status === "Pending" && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleAccept(voter.voter_id, voter.user_address)
                          }
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleReject(voter.voter_id)}
                          sx={{ ml: 2 }}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {voter.status === "Accepted" && (
                      <Typography variant="body2" color="success.main">
                        Accepted
                      </Typography>
                    )}
                    {voter.status === "Rejected" && (
                      <Typography variant="body2" color="error.main">
                        Rejected
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No voters found
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default VoterDetails;
