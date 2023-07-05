import { FieldValues, useController } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

import { ControlledFormFieldProps } from "../types";

interface InputProps extends ChakraInputProps {
  label?: string;
}

interface Props<TFieldValues extends FieldValues = FieldValues>
  extends ControlledFormFieldProps<TFieldValues> {
  inputProps?: InputProps;
  labelProps?: FormLabelProps;
}

export const FormInput = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { inputProps, labelProps, config } = props;

  const { label, ...restInputProps } = inputProps || {};

  const {
    field,
    fieldState: { error },
  } = useController(config);

  return (
    <FormControl isInvalid={Boolean(error)}>
      {label && <FormLabel {...labelProps}>{label}</FormLabel>}
      <Input {...restInputProps} {...field} />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
