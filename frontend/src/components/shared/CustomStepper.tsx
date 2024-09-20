import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface CustomStepperProps {
  status: string;
  isAdmin?: boolean;
}

const adminLabels = [
  'Event Creation',
  'Open Applications',
  'Project Uploads',
  'Live Leaderboard',
  'Event Completed',
];

const voterLabels = ['Request Submitted', 'Approval Pending', 'Voting Open'];

export default function CustomStepper({
  status,
  isAdmin = false,
}: CustomStepperProps) {
  const steps = isAdmin ? adminLabels : voterLabels;
  const getActiveStep = (status: string) => {
    const stepIndex = steps.indexOf(status);
    return stepIndex !== -1 ? stepIndex : steps.length;
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
