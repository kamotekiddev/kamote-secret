import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Vault } from "@prisma/client";

interface SuccessResponse {
  data: Vault[];
}

const useFetchVaults = () =>
  useQuery<SuccessResponse, AxiosError<{ message: string }>, Vault[]>({
    queryKey: ["vaults"],
    queryFn: () => axios.get("/api/vaults"),
    select: (response) => response.data,
  });

export default useFetchVaults;
