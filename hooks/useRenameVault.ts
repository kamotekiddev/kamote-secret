import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Vault } from "@prisma/client";

interface SuccessResponse {
  data: { message: string; vault: Vault };
}

const useRenameVault = <T>() => {
  const queryClient = useQueryClient();
  return useMutation<SuccessResponse, AxiosError, { id: string; data: T }>(
    ({ id, data }) => axios.put(`/api/vaults/${id}`, data),
    { onSuccess: () => queryClient.invalidateQueries("vaults") }
  );
};

export default useRenameVault;
