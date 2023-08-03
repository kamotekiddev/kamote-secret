"use client";

import { Grid, Stack } from "@/components/chakra-components";
import { useParams } from "next/navigation";

import useFetchSecrets from "@/hooks/secrets/api/useFetchSecrets";
import useDeleteSecretModal from "@/hooks/secrets/useDeleteSecretModal";
import EmptyVault from "../EmptyVault";
import SecretBox from "./SecretBox";
import SecretSkeleton from "./SecretSkeleton";

const Secrets = () => {
  const { vaultId } = useParams();
  const { onOpen } = useDeleteSecretModal();

  const { data: secrets, isLoading } = useFetchSecrets(vaultId as string);

  if (isLoading)
    return (
      <Stack rowGap={4}>
        {[...Array(10).keys()].map((i) => (
          <SecretSkeleton key={i} />
        ))}
      </Stack>
    );

  if (!secrets?.length) return <EmptyVault />;

  return (
    <Grid rowGap={4}>
      {secrets?.map((secret) => (
        <SecretBox
          key={secret.id}
          secret={secret}
          onDelete={() => onOpen(secret)}
        />
      ))}
    </Grid>
  );
};

export default Secrets;
