import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../authentication/AuthContext";
import pb from "../authentication/PocketBaseClient";
import { Bounce } from "react-toastify";
import { toasterror, toastsuccess, toastwarn } from "../toasthelper";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const UploadImageModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user, updateProfile } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.refresh();
      try {
        (async () => {
          const existingRecord = await pb.collection("userProfileImages").getFullList({
            filter: `user_id="${user.id}"`,
          });
          if (existingRecord.length > 0 && existingRecord[0].image) {
            setPreview(pb.getFileUrl(existingRecord[0], existingRecord[0].image));
          }
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);


  const ErrorOptions = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    toastId: "uploadimagemodal_error_toast",
    transition: Bounce,
  };

  const SuccesOptions = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "uploadimagemodal_success_toast",
    theme: "colored",
    transition: Bounce,
  };

  const WarnOptions = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "uploadimagemodal_warn_toast",
    theme: "colored",
    transition: Bounce,
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validFormats = ["image/png", "image/jpeg", "image/jpg"];

      if (!validFormats.includes(selectedFile.type)) {
        toasterror("Csak PNG, JPEG vagy JPG formátumú képek engedélyezettek.", ErrorOptions);
        setFile(null);
        setPreview(null);
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        toasterror("A fájl mérete nem haladhatja meg az 5 MB-ot.", ErrorOptions);
        setFile(null);
        setPreview(null);
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!user) {
      toasterror("Érvénytelen felhasználó.", ErrorOptions);
      return;
    }
    if (!file) {
      toasterror("Nincs kiválasztott kép.", ErrorOptions);
      return;
    }
    setIsSubmitting(true);
    try {
      const existingRecord = await pb.collection("userProfileImages").getFullList({
        filter: `user_id="${user.id}"`,
      });

      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("image", file);

      if (existingRecord.length > 0)
        await pb.collection("userProfileImages").update(existingRecord[0].id, formData);
      else 
        await pb.collection("userProfileImages").create(formData);
      toastsuccess("Kép sikeresen feltöltve!", SuccesOptions);
      setTimeout(() => {
        router.refresh();
      }, 3000);
      onClose();
    } catch (error) {
      console.error(error);
      toasterror("Hiba történt a feltöltés során.", ErrorOptions);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!user) {
      toasterror("Érvénytelen felhasználó.", ErrorOptions);
      return;
    }
    setIsSubmitting(true);
    try {
      const existingRecord = await pb
        .collection("userProfileImages")
        .getFirstListItem(`user_id="${user.id}"`);

      if (existingRecord) {
        await pb.collection("userProfileImages").delete(existingRecord.id);
        await updateProfile({ username: user.username, profile_picture: "avatar1" });
        setPreview(null);
        setFile(null);
        toastsuccess("Kép törölve.", SuccesOptions);
        setTimeout(() => {
          router.refresh();
        }, 3000);
        onClose();
      } else {
        toastwarn("Nincs törölhető kép.", WarnOptions);
      }
    } catch (error) {
      console.error(error);
      toasterror("Hiba történt a törlés során.", ErrorOptions);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="opaque">
      <ModalContent>
        <ModalHeader>Kép feltöltése (max. 5 MB)</ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center gap-4">
            <input type="file" accept=".png,.jpeg,.jpg" onChange={handleFileChange} />
            {preview && (
              <div className="mt-4">
                <Image
                  src={preview}
                  alt="Előnézet"
                  className="w-40 h-40 object-cover rounded-md"
                  height={100}
                  width={100}
                  style={{ borderRadius: '50%', border: '0.15rem solid #000' }}
                />

              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onPress={handleUpload}
            disabled={isSubmitting || !file}
          >
            {isSubmitting ? "Feltöltés..." : "Feltöltés"}
          </Button>
          <Button
            color="danger"
            onPress={handleDelete}
            disabled={isSubmitting}
            variant="light"
          >
            Törlés
          </Button>
          <Button
            color="secondary"
            onPress={onClose}
            disabled={isSubmitting}
            variant="light"
          >
            Bezárás
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadImageModal;