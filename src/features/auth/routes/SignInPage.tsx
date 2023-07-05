import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  // Checkbox,
  Container,
  // Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FormInput, FormPasswordField, useForm } from "@/lib/react-hook-form";
import { authEndpoints, mainEndpoints } from "@/routes/endpoints";
import { LocationState } from "@/routes/types";

import { useSignIn } from "../api";
import { SignInFormData, SignInSchema } from "../forms";
// import { OAuthButtonGroup } from "../components/OAuthButtonGroup";

export const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;

  const { handleSubmit, control } = useForm<SignInFormData>({
    validationSchema: SignInSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signIn, isSuccess, isLoading } = useSignIn();

  useEffect(() => {
    if (isSuccess) {
      if (locationState && locationState.from?.pathname) {
        navigate(locationState.from.pathname);
      } else {
        navigate(`/${mainEndpoints.HOME_PAGE}`);
      }
    }
  }, [navigate, isSuccess, locationState]);

  const onSubmit = handleSubmit((formData) => {
    signIn(formData);
  });

  const goToSignUpPage = () => {
    navigate(`../${authEndpoints.SIGN_UP_PAGE}`);
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
      <Stack spacing="6">
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
                Sign In
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="fg.muted">Don't have an account?</Text>
                <Button variant="link" onClick={goToSignUpPage}>
                  Sign up
                </Button>
              </HStack>
              <Stack spacing="5">
                <FormInput
                  inputProps={{ label: "Email" }}
                  config={{
                    control,
                    name: "email",
                  }}
                />
                <FormPasswordField
                  inputProps={{ label: "Password" }}
                  config={{ control, name: "password" }}
                />
              </Stack>
              {/* <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant="text" size="sm">
                  Forgot password?
                </Button>
              </HStack> */}
              <Stack spacing="6">
                <Button isLoading={isLoading} type="submit" variant="solid">
                  Sign in
                </Button>
                {/* <HStack>
                <Divider />
                <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup /> */}
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};
