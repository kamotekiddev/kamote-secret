import CreateVaultModal from "@/components/modals/CreateVaultModal";
import DeleteVaultModal from "@/components/modals/DeleteVaultModal";
import RenameVaultModal from "@/components/modals/RenameVaultModal";

const ModalProvider = () => {
  return (
    <>
      <CreateVaultModal />
      <DeleteVaultModal />
      <RenameVaultModal />
    </>
  );
};

export default ModalProvider;
