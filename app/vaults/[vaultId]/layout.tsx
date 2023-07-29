import { ReactNode } from "react";

import { Center } from "@/components/chakra-components";
import Header from "./Header";
import getVaultById from "@/action/getVaultById";

interface Props {
  children: ReactNode;
  params: { vaultId: string };
}

const Layout = async ({ params, children }: Props) => {
  const vault = await getVaultById(params.vaultId);

  if (!vault) return <Center>Channel Not Found</Center>;

  return (
    <div>
      <Header vault={vault} />
      {children}
    </div>
  );
};

export default Layout;
