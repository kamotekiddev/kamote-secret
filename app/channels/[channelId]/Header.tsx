"use client";
import { isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { Button, useToast } from "@/components/chakra-components";

import useDeleteChannelMutation from "@/hooks/useDeleteChannelMutation";

const Header = () => {
  const toast = useToast();
  const { mutateAsync: deleteChannel, isLoading } = useDeleteChannelMutation();
  const { channelId } = useParams();

  const handleDelete = async () => {
    try {
      const { data } = await deleteChannel(channelId as string);
      toast({
        title: "Success",
        description: data.message,
        status: "success",
      });
    } catch (error) {
      if (isAxiosError<{ message: string }>(error))
        toast({ title: "Error", description: error.response?.data.message });
    }
  };

  return (
    <div>
      <Button isLoading={isLoading} colorScheme="red" onClick={handleDelete}>
        Delete Channel
      </Button>
    </div>
  );
};

export default Header;
