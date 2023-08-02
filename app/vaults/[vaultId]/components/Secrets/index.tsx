"use client";

import { isAxiosError } from "axios";
import { Grid, Stack, useToast } from "@/components/chakra-components";
import { useParams } from "next/navigation";

import { Secret } from "@prisma/client";
import useFetchSecrets from "@/hooks/secrets/api/useFetchSecrets";
import EmptyVault from "../EmptyVault";
import SecretBox from "./SecretBox";
import SecretSkeleton from "./SecretSkeleton";
import useDeleteSecret from "@/hooks/secrets/api/useDeleteSecret";

const Secrets = () => {
  const toast = useToast();
  const { vaultId } = useParams();
  const { mutateAsync: deleteSecret } = useDeleteSecret();

  const { data: secrets, isLoading } = useFetchSecrets(vaultId as string);

  const handleDelete = async (secret: Secret) => {
    try {
      const { data } = await deleteSecret({
        secretId: secret.id,
        vaultId: secret.vaultId,
      });
      toast({ title: "Success", description: data.message, status: "success" });
    } catch (error) {
      if (isAxiosError<{ message: string }>(error))
        toast({
          title: "Error",
          description: error.response?.data.message,
          status: "error",
        });
    }
  };

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
        <SecretBox key={secret.id} secret={secret} onDelete={handleDelete} />
      ))}
    </Grid>
  );
};

export default Secrets;
