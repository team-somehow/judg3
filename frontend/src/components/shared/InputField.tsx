import { ChangeEventHandler } from 'react';

import { TextField, TextFieldVariants } from '@mui/material';

type Props = {
  variant: TextFieldVariants;
  label: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  rest?: any;
};

const InputField = ({ variant, label, onChange, ...rest }: Props) => {
  return (
    <TextField
      label={label}
      variant={variant}
      onChange={onChange}
      {...rest}
      fullWidth
    />
  );
};

export default InputField;
