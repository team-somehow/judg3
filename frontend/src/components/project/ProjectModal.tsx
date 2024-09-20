import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    demoLink: string;
    sourceCodeLink: string;
  } | null;
  onClose: () => void;
  onVote: (projectId: number) => void;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflowY: 'scroll',
};

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onVote,
}) => {
  if (!project) return null;

  return (
    <Modal
      open={Boolean(project)}
      onClose={onClose}
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="project-modal-title" variant="h6" component="h2">
          {project.title}
        </Typography>
        <Typography id="project-modal-description" sx={{ mt: 2 }}>
          {project.description}
        </Typography>
        <Typography sx={{ mt: 2 }}>Tags:</Typography>
        <div>
          {project.tags.map((tag) => (
            <Button
              key={tag}
              variant="outlined"
              size="small"
              style={{ marginRight: '4px' }}
            >
              {tag}
            </Button>
          ))}
        </div>
        <Button href={project.demoLink} target="_blank" sx={{ mt: 2 }}>
          Live Demo
        </Button>
        <Button href={project.sourceCodeLink} target="_blank" sx={{ mt: 2 }}>
          Source Code
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onVote(project.id)}
          sx={{ mt: 2 }}
        >
          Vote this Project
        </Button>
      </Box>
    </Modal>
  );
};

export default ProjectModal;
