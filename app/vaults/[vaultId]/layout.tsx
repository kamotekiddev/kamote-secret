import { ReactNode } from "react";

import Header from "./Header";
import { Grid } from "@/components/chakra-components";

interface Props {
  children: ReactNode;
  params: { vaultId: string };
}

const Layout = async ({ params, children }: Props) => {
  return (
    <Grid templateRows="auto 1fr">
      <Header />
      {children}
    </Grid>
  );
};

export default Layout;
