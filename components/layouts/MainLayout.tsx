import { ReactNode } from "react";
import { Grid } from "@/components/chakra-components";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return <Grid h="100vh">{children}</Grid>;
};

export default MainLayout;
