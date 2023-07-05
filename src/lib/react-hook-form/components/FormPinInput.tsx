import { useCallback } from "react";
import { FieldValues, useController } from "react-hook-form";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  HStack,
  PinInput,
  PinInputField,
  PinInputProps,
} from "@chakra-ui/react";

import { ControlledFormFieldProps } from "../types";

interface Props<TFieldValues extends FieldValues = FieldValues>
  extends ControlledFormFieldProps<TFieldValues> {
  /** Default value is 1 */
  pinLength: number;
  inputProps?: Omit<PinInputProps, "children">;
  wrapperProps?: FormControlProps;
}

export const FormPinInput = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { inputProps, wrapperProps, config, pinLength = 1 } = props;

  const { onChange: onInputChange, ...restInputProps } = inputProps || {};

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    field: { ref, onChange, ...fieldRest },
    fieldState: { error },
  } = useController(config);

  const renderPins = useCallback(() => {
    const pinsList: JSX.Element[] = [];

    for (let i = 0; i < pinLength; i++) {
      pinsList.push(<PinInputField key={i} />);
    }

    return pinsList;
  }, [pinLength]);

  const changeHandler = (value: string) => {
    onChange(value as any);
    onInputChange && onInputChange(value);
  };

  return (
    <FormControl
      width="min-content"
      isInvalid={Boolean(error)}
      {...wrapperProps}
    >
      <HStack>
        <PinInput
          isInvalid={Boolean(error)}
          onChange={changeHandler}
          {...restInputProps}
          {...fieldRest}
        >
          {renderPins()}
        </PinInput>
      </HStack>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
