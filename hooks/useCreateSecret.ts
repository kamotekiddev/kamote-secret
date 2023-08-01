import { Secret } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

interface SuccessResponse {
  data: { message: string; secret: Secret };
}

const useCreateSecret = <T>() => {
  const queryClient = useQueryClient();
  return useMutation<SuccessResponse, AxiosError, { vaultId: string; data: T }>(
    ({ vaultId, data }) => axios.post(`/api/vaults/${vaultId}/secrets`, data),
    { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vault"] }) }
  );
};

export default useCreateSecret;
