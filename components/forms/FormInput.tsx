import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";

interface Props extends InputProps {
  isRequired?: boolean;
  label: string;
  error?: string;
  description?: string;
}

const FormInput = ({ isRequired, label, error, ...props }: Props) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input {...props} />
      {!!error && <FormHelperText color="red.500">{error}</FormHelperText>}
    </FormControl>
  );
};

export default FormInput;
