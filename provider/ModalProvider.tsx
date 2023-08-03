import CreateVaultModal from "@/components/modals/CreateVaultModal";
import DeleteSecretModal from "@/components/modals/DeleteSecretModal";
import DeleteVaultModal from "@/components/modals/DeleteVaultModal";
import RenameVaultModal from "@/components/modals/RenameVaultModal";

const ModalProvider = () => {
  return (
    <>
      <CreateVaultModal />
      <DeleteVaultModal />
      <RenameVaultModal />
      <DeleteSecretModal />
    </>
  );
};

export default ModalProvider;
