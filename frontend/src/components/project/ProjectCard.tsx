import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Avatar,
  Chip,
  Grid,
} from '@mui/material';
import { GitHub, Language, YouTube } from '@mui/icons-material';

interface ProjectCardProps {
  id: number;
  name: string;
  description: string;
  photo: string;
  url: string;
  onVote: (projectId: number) => void;
  // onViewSource: (projectId: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  photo,
  url,
  onVote,
  // onViewSource,
}) => {
  return (
    <Box
      sx={{
        bgcolor: '#171318',
        borderRadius: '10px',
        height: '100%',
        p: 1,
      }}
    >
      <Card
        sx={{
          borderRadius: '5px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                marginRight: 2,
                borderRadius: '10px',
              }}
            >
              {name[0]}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="600">
                {name}
              </Typography>
              {/* <Typography variant="subtitle2" color="text.secondary">
                {description}
              </Typography> */}
            </Box>
          </Box>
          {/* <Grid container spacing={1} mb={2}>
            {project.tags.map((tag) => (
              <Grid item key={tag}>
                <Chip
                  label={tag}
                  variant="outlined"
                  size="small"
                  sx={{
                    bgcolor: '#44464E',
                    border: 'none',
                    color: 'primary.main',
                    borderRadius: '5px',
                    fontSize: { xs: '12px', sm: '14px', md: '15px' },
                    padding: '4px',
                  }}
                />
              </Grid>
            ))}
          </Grid> */}
          <Box
            component="img"
            src={photo}
            alt={'Image'}
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: '10px',
              border: '2px solid rgba(248, 248, 255, 0.60)',
              mb: 2,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              href={url}
              target="_blank"
              fullWidth
              startIcon={<YouTube />}
            >
              Live Demo
            </Button>
            {/* <Button
              variant="outlined"
              color="primary"
              onClick={() => onViewSource(project.id)}
              fullWidth
              startIcon={<GitHub />}
            >
              Source Code
            </Button> */}
          </Box>

          <Typography variant="h6" gutterBottom>
            Project Description
          </Typography>
          <Typography variant="subtitle2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onVote(id)}
            fullWidth
          >
            Vote this Project
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProjectCard;
