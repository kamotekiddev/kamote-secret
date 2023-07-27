import { ReactNode } from "react";

import { Center } from "@/components/chakra-components";
import Header from "./Header";
import getChannelById from "@/action/getChannelById";

interface Props {
  children: ReactNode;
  params: { channelId: string };
}

const Layout = async ({ params, children }: Props) => {
  const channel = await getChannelById(params.channelId);

  if (!channel) return <Center>Channel Not Found</Center>;

  return (
    <div>
      <Header channel={channel} />
      {children}
    </div>
  );
};

export default Layout;
