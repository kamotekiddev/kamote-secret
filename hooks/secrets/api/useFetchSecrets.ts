import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Secret } from "@prisma/client";

interface SuccessResponse {
  data: Secret[];
}

const useFetchSecrets = (vaultId: string) =>
  useQuery<SuccessResponse, AxiosError<{ message: string }>, Secret[]>({
    queryKey: ["secrets", vaultId],
    queryFn: () => axios.get(`/api/vaults/${vaultId}/secrets`),
    select: (response) => response.data,
    enabled: !!vaultId,
  });

export default useFetchSecrets;
