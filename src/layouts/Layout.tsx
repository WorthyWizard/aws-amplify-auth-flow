import { Outlet } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";

import { useAuthentication } from "@/features/auth";

import { Header } from "./Header";

export const Layout = () => {
  const { isInitialLoading } = useAuthentication();

  if (isInitialLoading) return <Heading>Loading...</Heading>;

  return (
    <Box as="div" display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box as="main" p={3} display="flex" flexDirection="column" flex={1}>
        <Outlet />
      </Box>
    </Box>
  );
};
