import { Secret } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

interface SuccessResponse {
  data: { message: string; secret: Secret };
}

const useCreateSecret = <T>() => {
  return useMutation<SuccessResponse, AxiosError, { vaultId: string; data: T }>(
    ({ vaultId, data }) => axios.post(`/api/vaults/${vaultId}/secrets`, data)
  );
};

export default useCreateSecret;
