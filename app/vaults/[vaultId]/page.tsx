import { Box } from "@/components/chakra-components";
import Secrets from "./components/Secrets";

const VaultId = () => {
  return (
    <Box p={4} overflow="auto">
      <Secrets />
    </Box>
  );
};

export default VaultId;
