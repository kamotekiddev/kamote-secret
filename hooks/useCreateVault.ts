import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Vault } from "@prisma/client";

interface SuccessResponse {
  data: {
    message: string;
    vault: Vault;
  };
}

const useCreateVault = <T>() => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, AxiosError, T>(
    (data) => axios.post("/api/vaults", data),
    { onSuccess: () => queryClient.invalidateQueries(["vaults"]) }
  );
};

export default useCreateVault;
