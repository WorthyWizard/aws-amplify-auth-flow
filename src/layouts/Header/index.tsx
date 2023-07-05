import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";

import { toSignInPage, useAuthentication, useSignOut } from "@/features/auth";
import * as endpoints from "@/routes/endpointsConstants";

export const Header = () => {
  const { isAuthenticated } = useAuthentication();

  const { mutate: signOut, isLoading } = useSignOut();

  return (
    <Box
      as="header"
      px={6}
      py={3}
      bgGradient="linear(to-r, #dd5e89, #f7bb97)"
      height={16}
    >
      <HStack
        height="100%"
        justifyContent={isAuthenticated ? "space-between" : "center"}
      >
        <Heading size="md" color="white">
          <Link to={isAuthenticated ? endpoints.HOME_PAGE : toSignInPage()}>
            AWS Amplify Auth Flow
          </Link>
        </Heading>
        {isAuthenticated && (
          <Button
            isLoading={isLoading}
            loadingText="Loggin out..."
            rightIcon={<FiArrowRight />}
            onClick={() => signOut()}
          >
            Logout
          </Button>
        )}
      </HStack>
    </Box>
  );
};
