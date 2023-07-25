import { FiPlus } from "react-icons/fi";
import { Button, Grid } from "@/components/chakra-components";

const Sidenav = () => {
  return (
    <Grid
      templateRows="auto 1fr"
      minW="250px"
      p={4}
      borderRight="1px"
      borderColor="gray.200"
    >
      <Button colorScheme="green" leftIcon={<FiPlus />}>
        Create
      </Button>
    </Grid>
  );
};

export default Sidenav;
