import { ReactNode } from "react";
import { Grid } from "@/components/chakra-components";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <Grid templateRows="auto 1fr" minH="100vh">
      <Navbar />
      {children}
    </Grid>
  );
};

export default MainLayout;
