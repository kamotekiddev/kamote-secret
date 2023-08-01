"use client";

import { Grid } from "@/components/chakra-components";
import { useParams } from "next/navigation";

import useFetchSecrets from "@/hooks/secrets/api/useFetchSecrets";
import EmptyVault from "../EmptyVault";
import SecretBox from "./SecretBox";

const Secrets = () => {
  const { vaultId } = useParams();

  const { data: secrets } = useFetchSecrets(vaultId as string);

  if (!secrets?.length) return <EmptyVault />;

  return (
    <Grid rowGap={4}>
      {secrets?.map((secret) => (
        <SecretBox key={secret.id} secret={secret} />
      ))}
    </Grid>
  );
};

export default Secrets;
