import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

interface SuccessResponse {
  data: {
    message: string;
    user: User;
  };
}

const useCreateEncryptionKey = () => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, AxiosError, string>(
    (secretKey) => axios.put("/api/user", { secretKey }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["current-user"] }),
    }
  );
};

export default useCreateEncryptionKey;
