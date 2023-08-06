import CreateVaultModal from "@/components/modals/CreateVaultModal";
import DeleteSecretModal from "@/components/modals/DeleteSecretModal";
import DeleteVaultModal from "@/components/modals/DeleteVaultModal";
import RenameVaultModal from "@/components/modals/RenameVaultModal";
import EncryptOrDecryptModal from "@/components/modals/EncryptOrDecryptModal";

const ModalProvider = () => {
  return (
    <>
      {/* vaults */}
      <CreateVaultModal />
      <DeleteVaultModal />
      <RenameVaultModal />
      <DeleteSecretModal />
      {/* secrets */}
      <EncryptOrDecryptModal />
    </>
  );
};

export default ModalProvider;
