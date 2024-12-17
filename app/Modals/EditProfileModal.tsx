'use client';
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useAuth } from "../authentication/AuthContext";
import Image from "next/image";
import avatarImages from "../assets/avatarImages";
import { Bounce } from "react-toastify";
import { toasterror, toastsuccess } from "../toasthelper";
import UploadImageModal from "./UploadImageModal";
import { useProfileImage } from "../contexts/ProfileImageContext";

const predefinedImageKeys = [
  "avatar1",
  "avatar2",
  "avatar3",
  "avatar4",
  "avatar5",
  "avatar6",
];

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const { fetchCustomImage } = useProfileImage();
  const [username, setUsername] = useState("");
  const [selectedImageKey, setSelectedImageKey] = useState<string>("");
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ErrorOptions = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    toastId: "editprofilemodal_error_toast",
    transition: Bounce,
  }

  const SuccesOptions = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "editprofilemodal_success_toast",
    theme: "colored",
    transition: Bounce,
  }

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setSelectedImageKey(user.profile_picture || "avatar1");
      loadCustomImage();
    }
  }, [user]);

  const loadCustomImage = async () => {
    if (user?.id) {
      const url = await fetchCustomImage(user.id);
      if (url) {
        setCustomImageUrl(url);
      } else {
        setCustomImageUrl(null);
        setSelectedImageKey("avatar1");
      }
    }
  };

  const handleImageSelect = (imageKey: string) => {
    setSelectedImageKey(imageKey);
  };

  const handleCustomImageSelect = () => {
    setSelectedImageKey("custom");
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);

    try {
      await updateProfile({ username, profile_picture: selectedImageKey });
      toastsuccess("Sikeres szerkesztés", SuccesOptions);
      await loadCustomImage();
      onClose();
    } catch (error) {
      console.error("Profil szerkesztési hiba:", error);
      toasterror("Hiba történt a profil szerkesztésekor.", ErrorOptions);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetName = () => {
    setUsername(user?.username || "");
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={resetName} backdrop="opaque">
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Profil Szerkesztése</ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={
                      selectedImageKey === "custom" && customImageUrl
                        ? customImageUrl
                        : avatarImages[selectedImageKey] || avatarImages["avatar1"].src
                    }
                    alt="Selected Profile Picture"
                    width={100}
                    height={100}
                    className="w-40 h-40 object-cover rounded-md"
                    style={{
                      borderRadius: "50%",
                      height: "6.25rem",
                      width: "6.25rem",
                    }}
                  />
                  <div>Válassz egy profilképet:</div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {predefinedImageKeys.map((imageKey) => (
                      <div
                        key={imageKey}
                        className={`relative cursor-pointer border-2 ${selectedImageKey === imageKey ? "border-blue-500" : "border-transparent"
                          } rounded-full`}
                        onClick={() => handleImageSelect(imageKey)}
                      >
                        <Image
                          src={avatarImages[imageKey]}
                          alt={`Predefined Avatar ${imageKey}`}
                          width={52}
                          height={52}
                          className="rounded-full"
                        />
                        {selectedImageKey === imageKey && (
                          <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-50 rounded-full">
                            <div color="white">✓</div>
                          </div>
                        )}
                      </div>
                    ))}

                    {customImageUrl && (
                      <div
                        className={`relative cursor-pointer border-2 ${selectedImageKey === "custom" ? "border-blue-500" : "border-transparent"
                          } rounded-full`}
                        onClick={handleCustomImageSelect}
                        style={{ margin: "auto" }}
                      >
                        <Image
                          src={customImageUrl}
                          alt="Custom Avatar"
                          width={52}
                          height={52}
                          className="w-40 h-40 object-cover rounded-md"
                          style={{
                            borderRadius: "50%",
                            height: "3.25rem",
                            width: "3.25rem",
                          }}
                        />
                        {selectedImageKey === "custom" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-50 rounded-full">
                            <div color="white">✓</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div>Vagy tölts fel egy saját profilképet:</div>
                  <Button
                    color="primary"
                    variant="light"
                    onPress={() => setUploadModalOpen(true)}
                  >
                    Kép feltöltése/módosítása
                  </Button>
                </div>
                <Input
                  label="Felhasználónév"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="light"
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Mentés..." : "Mentés"}
              </Button>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                disabled={isSubmitting}
              >
                Mégsem
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Feltöltés modal */}
      <UploadImageModal
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(false);
          loadCustomImage();
        }}
      />
    </>
  );
};

export default EditProfileModal;
