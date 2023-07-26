import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Channel } from "@prisma/client";

interface SuccessResponse {
  data: Channel[];
}

const useFetchChannels = () =>
  useQuery<SuccessResponse, AxiosError<{ message: string }>, Channel[]>({
    queryKey: ["secret-channels"],
    queryFn: () => axios.get("/api/secret-channel"),
    select: (response) => response.data,
  });

export default useFetchChannels;
