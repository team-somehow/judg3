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
  Divider,
  IconButton,
} from '@mui/material';
import { GitHub, Language, Link, YouTube } from '@mui/icons-material';

interface ProjectCardProps {
  id: number;
  name: string;
  description: string;
  photo: string;
  url: string;
  onVote: (projectId: number) => void;
  isRight?: boolean;
  // onViewSource: (projectId: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  photo,
  url,
  onVote,
  isRight,
  // onViewSource,
}) => {
  const primaryColor = isRight ? '#1E50FF' : 'primary.main';

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
          <Box
            display="flex"
            alignItems="center"
            mb={2}
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: primaryColor,
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
              </Box>
              {/* <Typography variant="subtitle2" color="text.secondary">
                {description}
              </Typography> */}
            </Box>
            <Button
              href={url}
              target="_blank"
              aria-label="project-url"
              variant="contained"
              sx={{
                bgcolor: primaryColor,
              }}
              startIcon={<Language />}
            >
              Project URL
            </Button>
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
            }}
          />
          <Typography variant="h6" gutterBottom>
            Project Description
          </Typography>
          <Box
            sx={{
              height: '100px',
              bgcolor: 'rgba(0, 0, 0, 0.40)',
              overflow: 'auto',
              p: 1,
              borderRadius: '5px',
            }}
          >
            <Typography variant="subtitle2">{description}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={() => onVote(id)}
            fullWidth
            sx={{
              bgcolor: primaryColor,
            }}
          >
            Vote this Project
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProjectCard;
