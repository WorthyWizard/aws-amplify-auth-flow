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

import { FormPasswordField, useForm } from "@/lib/react-hook-form";
import { FormInput } from "@/lib/react-hook-form";
import { authEndpoints } from "@/routes/endpoints";
import { LocationState } from "@/routes/types";

import { useSignUp } from "../api";
import { SignUpFormData, SignUpSchema } from "../forms";
import { toConfirmSignUpPage } from "../utils";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;

  const { handleSubmit, control, getValues } = useForm<SignUpFormData>({
    validationSchema: SignUpSchema,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: signUp, isSuccess, isLoading } = useSignUp();

  useEffect(() => {
    if (isSuccess) {
      navigate(toConfirmSignUpPage(), {
        state: {
          ...locationState,
          username: getValues().email,
        },
      });
    }
  }, [navigate, isSuccess, locationState]);

  const onSubmit = handleSubmit((formData) => {
    const { email, password } = formData;

    signUp({
      email,
      password,
    });
  });

  const goToSignInPage = () => {
    navigate(`../${authEndpoints.SIGN_IN_PAGE}`);
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
        boxShadow={{ base: "none", sm: "lg" }}
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <form onSubmit={onSubmit}>
          <Stack spacing="6">
            <Heading textAlign="center" size={{ base: "md", md: "md" }}>
              Sign Up
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="fg.muted">Already have an account?</Text>
              <Button variant="link" onClick={goToSignInPage}>
                Sign in
              </Button>
            </HStack>
            <Stack spacing="5">
              <FormInput
                inputProps={{ label: "Email" }}
                config={{ control, name: "email" }}
              />
              <FormPasswordField
                inputProps={{ label: "Password" }}
                config={{ control, name: "password" }}
              />
              <FormPasswordField
                inputProps={{ label: "Confirm password" }}
                config={{ control, name: "confirmPassword" }}
              />
            </Stack>
            <Stack spacing="6">
              <Button isLoading={isLoading} type="submit" variant="solid">
                Sign up
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
