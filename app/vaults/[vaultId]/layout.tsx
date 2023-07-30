import { ReactNode } from "react";

import Header from "./Header";

interface Props {
  children: ReactNode;
  params: { vaultId: string };
}

const Layout = async ({ params, children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
