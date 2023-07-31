import { Box } from "@/components/chakra-components";
import CreateSecretForm from "./CreateSecretForm";

const CreateSecret = () => {
  return (
    <Box p={6} overflow="auto">
      <CreateSecretForm />
    </Box>
  );
};

export default CreateSecret;
