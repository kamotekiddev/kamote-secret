import prismadb from "@/libs/prismadb";

const getVaultById = async (id: string) => {
  try {
    const channel = await prismadb.vault.findUnique({ where: { id } });
    return channel;
  } catch (error) {
    return null;
  }
};

export default getVaultById;
