import { forwardRef } from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";

interface Props extends TextareaProps {
  label: string;
  error?: string;
  isRequired?: boolean;
}

const FormTextArea = forwardRef(
  ({ label, error, isRequired, ...props }: Props, ref) => {
    return (
      <FormControl isRequired={isRequired}>
        <FormLabel>{label}</FormLabel>
        <Textarea {...props} ref={ref} />
        {!!error && <FormHelperText color="red.500">{error}</FormHelperText>}
      </FormControl>
    );
  }
);

export default FormTextArea;
