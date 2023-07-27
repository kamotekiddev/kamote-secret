import CreateChannelModal from "@/components/modals/CreateChannelModal";
import DeleteChannelModal from "@/components/modals/DeleteChannelModal";

const ModalProvider = () => {
  return (
    <>
      <CreateChannelModal />
      <DeleteChannelModal />
    </>
  );
};

export default ModalProvider;
