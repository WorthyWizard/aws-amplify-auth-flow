import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useToast } from "@/lib/chakra";
import { FormPinInput, useForm } from "@/lib/react-hook-form";
import { LocationState } from "@/routes/types";

import { useConfirmSignUp, useResendConfirmationCode } from "../api";
import { SignUpConfirmationFormData, SignUpConfirmationSchema } from "../forms";
import { toSignInPage } from "../utils";

import { messages } from "./messages";

export const ConfirmSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;

  const toast = useToast();

  const { handleSubmit, control } = useForm<SignUpConfirmationFormData>({
    validationSchema: SignUpConfirmationSchema,
    defaultValues: {
      code: "",
    },
  });

  const {
    mutate: resendConfirmationCode,
    isLoading: resendConfirmationCodeLoading,
  } = useResendConfirmationCode();

  const {
    mutate: confirmSignUp,
    isSuccess: confirmSignUpSuccess,
    isLoading: confirmSignUpLoading,
  } = useConfirmSignUp();

  useEffect(() => {
    if (confirmSignUpSuccess) {
      navigate(toSignInPage(), {
        replace: true,
      });

      toast({
        status: "success",
        description: messages.successfullRegistration,
      });
    }
  }, [navigate, confirmSignUpSuccess, locationState]);

  const onSubmit = handleSubmit((formData) => {
    const { code } = formData;

    if (locationState?.username) {
      confirmSignUp({
        code,
        username: locationState.username,
      });
    }
  });

  const resendConfirmationCodeHandler = () => {
    if (locationState?.username) {
      resendConfirmationCode({ username: locationState.username });
    }
  };

  return (
    <Container
      maxW="lg"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      flex={1}
      py={{ base: "12" }}
      px={{ base: "0", sm: "8" }}
    >
      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={{ base: "transparent", sm: "bg.surface" }}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <form onSubmit={onSubmit}>
          <Stack spacing="6">
            <Heading textAlign="center" size={{ base: "md", md: "md" }}>
              Sign Up Confirmation
            </Heading>
            <Text color="fg.muted" align="justify">
              We have sent you a confirmation code to your email. Please,
              provide the code in the field below
            </Text>
            <Stack spacing="5">
              <HStack justifyContent="center">
                <FormPinInput
                  pinLength={6}
                  config={{ control, name: "code" }}
                  inputProps={{
                    onComplete: () => onSubmit(),
                    autoFocus: true,
                    isDisabled: confirmSignUpLoading,
                  }}
                />
              </HStack>
              <Stack direction="row" alignItems="center">
                <Text color="fg.muted">Haven't received the code?</Text>
                <Button
                  variant="link"
                  isLoading={resendConfirmationCodeLoading}
                  loadingText="Sending..."
                  onClick={resendConfirmationCodeHandler}
                >
                  Resend code
                </Button>
              </Stack>
            </Stack>
            <Stack spacing="6">
              <Button
                isLoading={confirmSignUpLoading}
                type="submit"
                variant="solid"
              >
                Confirm
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
