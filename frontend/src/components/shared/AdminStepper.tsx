import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Event Creation',
  'Open Applications',
  'Project Uploads',
  'Live Leaderboard',
];

interface AdminStepperProps {
  status: string;
}

export default function AdminStepper({ status }: AdminStepperProps) {
  const getActiveStep = (status: string) => {
    switch (status) {
      case 'Event Creation':
        return 0;
      case 'Open Applications':
        return 1;
      case 'Project Uploads':
        return 2;
      case 'Live Leaderboard':
        return 3;
      default:
        return 4;
    }
  };

  const activeStep = getActiveStep(status);

  return (
    <Box sx={{ width: '100%', my: 1 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: index === activeStep ? 'primary.main' : 'white',
                },
              }}
              sx={{
                '& .MuiStepLabel-label': {
                  color: index === activeStep ? 'inherit' : 'white',
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
