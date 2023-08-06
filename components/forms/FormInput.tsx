import { forwardRef } from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@/components/chakra-components";

interface Props extends InputProps {
  isRequired?: boolean;
  label: string;
  error?: string;
  description?: string;
}

const FormInput = forwardRef(
  ({ isRequired, label, error, ...props }: Props, ref) => {
    return (
      <FormControl isRequired={isRequired}>
        <FormLabel>{label}</FormLabel>
        <Input {...props} ref={ref} />
        {!!error && <FormHelperText color="red.500">{error}</FormHelperText>}
      </FormControl>
    );
  }
);

export default FormInput;
