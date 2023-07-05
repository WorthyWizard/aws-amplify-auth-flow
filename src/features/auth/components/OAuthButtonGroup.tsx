import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";

import { useSignInWithGoogle } from "../api";

import { GoogleIcon } from "./ProviderIcons";

export const OAuthButtonGroup = () => {
  const { mutate: signInWithGoogle, isLoading: signInWithGoogleLoading } =
    useSignInWithGoogle();

  return (
    <ButtonGroup variant="secondary" spacing="4" width="full">
      <Button
        isLoading={signInWithGoogleLoading}
        width="full"
        variant="outline"
        onClick={() => signInWithGoogle()}
      >
        <VisuallyHidden>Sign in with Google</VisuallyHidden>
        <GoogleIcon boxSize="5" />
      </Button>
    </ButtonGroup>
  );
};
