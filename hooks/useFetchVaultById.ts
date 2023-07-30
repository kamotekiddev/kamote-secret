import axios, { AxiosError } from "axios";
import { Secret, Vault } from "@prisma/client";
import { useQuery } from "react-query";

interface VaultWithSecret extends Vault {
  secrets: Secret[];
}

interface SuccessResponse {
  data: VaultWithSecret;
}

const useFetchVaultById = (id: string) =>
  useQuery<SuccessResponse, AxiosError, VaultWithSecret>({
    queryKey: ["vault", id],
    queryFn: () => axios.get(`/api/vaults/${id}`),
    select: (response) => response.data,
  });

export default useFetchVaultById;
