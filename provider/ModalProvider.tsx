import CreateVaultModal from "@/components/modals/CreateVaultModal";
import DeleteSecretModal from "@/components/modals/DeleteSecretModal";
import DeleteVaultModal from "@/components/modals/DeleteVaultModal";
import RenameVaultModal from "@/components/modals/RenameVaultModal";
import EncryptOrDecryptModal from "@/components/modals/EncryptOrDecryptModal";
import CreateEncryptionKeyModal from "@/components/modals/CreateEncryptionKeyModal";

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
      {/* enctyption keys */}
      <CreateEncryptionKeyModal />
    </>
  );
};

export default ModalProvider;
