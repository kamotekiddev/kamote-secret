import { ReactNode } from "react";
import { Grid } from "@/components/chakra-components";

import Sidenav from "./components/Sidenav";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Grid templateColumns="auto 1fr" overflow="hidden">
      <Sidenav />
      {children}
    </Grid>
  );
};

export default Layout;
