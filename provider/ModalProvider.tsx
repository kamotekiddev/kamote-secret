import CreateVaultModal from "@/components/modals/CreateVaultModal";
import DeleteVaultModal from "@/components/modals/DeleteVaultModal";

const ModalProvider = () => {
  return (
    <>
      <CreateVaultModal />
      <DeleteVaultModal />
    </>
  );
};

export default ModalProvider;
