import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

import { Channel } from "@prisma/client";

interface SuccessResponse {
  data: {
    message: string;
    channel: Channel;
  };
}

const useDeleteChannelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<SuccessResponse, AxiosError, string>(
    (id) => axios.delete(`/api/secret-channel/${id}`),
    { onSuccess: () => queryClient.invalidateQueries(["secret-channels"]) }
  );
};

export default useDeleteChannelMutation;
