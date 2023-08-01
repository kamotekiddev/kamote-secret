import { ReactNode } from "react";

import Header from "./components/Header";
import { Grid } from "@/components/chakra-components";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  return (
    <Grid templateRows="auto 1fr" overflow="hidden">
      <Header />
      {children}
    </Grid>
  );
};

export default Layout;
