import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { Vault } from "@prisma/client";

interface SuccessResponse {
  data: {
    message: string;
    vault: Vault;
  };
}

const useDeleteVault = () => {
  const queryClient = useQueryClient();
  return useMutation<SuccessResponse, AxiosError, string>(
    (id) => axios.delete(`/api/vaults/${id}`),
    { onSuccess: () => queryClient.invalidateQueries(["vaults"]) }
  );
};

export default useDeleteVault;
