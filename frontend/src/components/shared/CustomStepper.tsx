import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface CustomStepperProps {
  status: string;
  isAdmin?: boolean;
  isVertical?: boolean;
  isRejected?: boolean;
}

const adminLabels = ['voters', 'project', 'active', 'complete'];

const voterLabels = ['Pending', 'Accepted', 'Leaderboard'];

const voterRejectedLabels = ['Pending', 'Accepted', 'Leaderboard'];

export default function CustomStepper({
  status,
  isAdmin = false,
  isVertical = false,
  isRejected = false,
}: CustomStepperProps) {
  const steps = isAdmin
    ? adminLabels
    : isRejected
    ? voterRejectedLabels
    : voterLabels;
  const getActiveStep = (status: string) => {
    const stepIndex = steps.indexOf(status);
    return stepIndex !== -1 ? stepIndex : steps.length;
  };

  const activeStep = getActiveStep(status);

  return (
    <Box sx={{ width: '100%', my: 1 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel={!isVertical}
        orientation={isVertical ? 'vertical' : 'horizontal'}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: index === activeStep ? 'primary.main' : 'white',
                  fontSize: isVertical ? '1.5rem' : '1rem',
                },
              }}
              sx={{
                '& .MuiStepLabel-label': {
                  color: index === activeStep ? 'inherit' : 'white',
                  fontSize: isVertical ? '1.1rem' : '1rem',
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
