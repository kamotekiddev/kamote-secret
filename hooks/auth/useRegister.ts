import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

interface SuccessResponse {
  data: {
    message: string;
    user: User;
  };
}

const useRegister = <T>() =>
  useMutation<SuccessResponse, AxiosError, T>((data) =>
    axios.post("/api/register", data)
  );

export default useRegister;
