import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Channel } from "@prisma/client";

interface SuccessResponse {
  data: {
    message: string;
    channel: Channel;
  };
}

const useCreateChannelMutation = <T>() => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, AxiosError, T>(
    (data) => axios.post("/api/secret-channel", data),
    { onSuccess: () => queryClient.invalidateQueries(["secret-channels"]) }
  );
};

export default useCreateChannelMutation;
