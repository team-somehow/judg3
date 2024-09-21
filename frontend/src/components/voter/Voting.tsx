import React, { useEffect, useState } from 'react';
import ProjectCard from '../project/ProjectCard';
import { Grid, LinearProgress, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../config/axios';

interface Project {
  photo: string;
  url: string;
  name: string;
  description: string;
}

const VotingSystem: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<{
    left_proj_id: number;
    right_proj_id: number;
    total_available_vote_count: number;
    curr_vote_count: number;
  } | null>(null);

  const [leftProject, setLeftProject] = useState<Project>();
  const [rightProject, setRightProject] = useState<Project>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/suggest/${id}`);
        setData(response.data);

        const { left_proj_id, right_proj_id } = response.data;

        const [leftResponse, rightResponse] = await Promise.all([
          axiosInstance.get(`/project/${left_proj_id}`),
          axiosInstance.get(`/project/${right_proj_id}`),
        ]);

        setLeftProject(leftResponse.data);
        setRightProject(rightResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!data || !leftProject || !rightProject) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          variant="determinate"
          value={(data.curr_vote_count / data.total_available_vote_count) * 100}
        />
      </Box>

      <Grid
        container
        spacing={2}
        sx={{
          height: 'calc(100vh - 150px)', // Adjusted for progress bar height
          width: '100vw',
          padding: 2,
        }}
      >
        <Grid item xs={12} md={6}>
          <ProjectCard
            id={data.left_proj_id}
            name={leftProject.name}
            description={leftProject.description}
            photo={leftProject.photo}
            url={leftProject.url}
            onVote={(id) => console.log('Voted for left project', id)}
            // onViewSource={() =>
            //   console.log('Viewed source for left project', data.left_proj_id)
            // }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProjectCard
            id={data.right_proj_id}
            name={rightProject.name}
            description={rightProject.description}
            photo={rightProject.photo}
            url={rightProject.url}
            onVote={(id) => console.log('Voted for left project', id)}
            // onViewSource={() =>
            //   console.log('Viewed source for left project', data.right_proj_id)
            // }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default VotingSystem;
