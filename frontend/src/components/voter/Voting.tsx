import React from 'react';
import ProjectCard from '../project/ProjectCard';
import { Grid } from '@mui/material';

const projects = [
  {
    id: 1,
    title: 'NFT Marketplace',
    description:
      'A decentralized platform for buying, selling, and trading NFTs securely on the blockchain.',
    tags: ['Blockchain', 'Ethereum', 'NFT'],
    demoLink: 'https://nftmarketplace.example.com',
    image: '/images/nft-marketplace.jpg',
  },
  {
    id: 2,
    title: 'Decentralized Voting App',
    description:
      'A blockchain-based application that allows users to participate in secure and anonymous voting.',
    tags: ['Blockchain', 'Voting', 'Solidity'],
    demoLink: 'https://votingapp.example.com',
    image: '/images/voting-app.jpg',
  },
];

const VotingSystem: React.FC = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: 'calc(100vh - 50px)',
        width: '100vw',
        padding: 2,
      }}
    >
      {projects.map((project) => (
        <Grid item xs={12} md={6} key={project.id}>
          <ProjectCard
            project={project}
            onVote={() => {}}
            onViewSource={() => {}}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default VotingSystem;
