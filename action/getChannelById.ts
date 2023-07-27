import prismadb from "@/libs/prismadb";

const getChannelById = async (id: string) => {
  try {
    const channel = await prismadb.channel.findUnique({ where: { id } });
    return channel;
  } catch (error) {
    return null;
  }
};

export default getChannelById;
