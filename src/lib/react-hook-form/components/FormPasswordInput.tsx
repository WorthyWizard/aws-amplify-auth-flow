import { FieldValues, useController } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  IconButton,
  Input,
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
  useDisclosure,
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

//forwardRef<HTMLInputElement, Props>

export const FormPasswordField = <
  TFieldValues extends FieldValues = FieldValues
>(
  props: Props<TFieldValues>
) => {
  const { config, inputProps, labelProps } = props;

  const { label } = inputProps || {};

  const { isOpen, onToggle } = useDisclosure();

  const {
    field,
    fieldState: { error },
  } = useController(config);

  const onClickReveal = () => {
    onToggle();
  };

  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel {...labelProps}>{label}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="text"
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          {...inputProps}
          {...field}
        />
      </InputGroup>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

FormPasswordField.displayName = "FormPasswordField";
