"use client";

import { ReactNode } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider as Provider, ThemeConfig } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const ChakraProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CacheProvider>
      <Provider theme={theme}>{children}</Provider>
    </CacheProvider>
  );
};

export default ChakraProvider;
