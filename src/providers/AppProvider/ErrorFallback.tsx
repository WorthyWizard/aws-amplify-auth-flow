import { FallbackProps } from "react-error-boundary";
import { Button } from "@chakra-ui/react";

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <h2>Ooops, something went wrong :( </h2>
      <Button onClick={() => resetErrorBoundary()}>Refresh</Button>
    </div>
  );
};
