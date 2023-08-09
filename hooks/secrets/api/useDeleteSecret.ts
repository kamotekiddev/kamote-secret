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
  secretKey: string;
}

const useDeleteSecret = () => {
  const queryClient = useQueryClient();
  return useMutation<SuccessResponse, AxiosError, Params>(
    ({ vaultId, secretId, secretKey }) =>
      axios.delete(`/api/vaults/${vaultId}/secrets/${secretId}`, {
        data: { secretKey },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["secrets"] });
        queryClient.invalidateQueries({ queryKey: ["vault"] });
      },
    }
  );
};

export default useDeleteSecret;
