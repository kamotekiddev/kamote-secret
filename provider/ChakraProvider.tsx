"use client";

import { ReactNode } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider as Provider } from "@chakra-ui/react";

const ChakraProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CacheProvider>
      <Provider>{children}</Provider>
    </CacheProvider>
  );
};

export default ChakraProvider;
