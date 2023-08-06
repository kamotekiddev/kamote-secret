import { Secret } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

interface SuccessResponse {
  data: {
    message: string;
    secret: Secret;
  };
}

interface Params {
  vaultId: string;
  secretId: string;
  action: string;
}

const useEncryptOrDecryptSecret = () => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, AxiosError, Params>(
    ({ vaultId, secretId, ...data }) =>
      axios.put(`/api/vaults/${vaultId}/secrets/${secretId}`, {
        action: data.action,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["secrets"] }),
    }
  );
};

export default useEncryptOrDecryptSecret;
