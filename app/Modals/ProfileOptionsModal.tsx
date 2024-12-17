'use client';

import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from "@nextui-org/react";
import { useAuth } from '../authentication/AuthContext';
import { useProfileImage } from '../contexts/ProfileImageContext';
import Image from "next/image";
import { Bounce } from "react-toastify";
import { toasterror } from '../toasthelper';

interface ProfileOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: 'myQuizzes' | 'editProfile') => void;
}

const ProfileOptionsModal: React.FC<ProfileOptionsModalProps> = ({ isOpen, onClose, onSelectOption }) => {
  const { user, logout } = useAuth();
  const { getUserAvatarUrl } = useProfileImage();
  const [avatarUrl, setAvatarUrl] = useState<string>('');

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

  useEffect(() => {
    const fetchAvatar = async () => {
      if (user) {
        const url = await getUserAvatarUrl(user);
        setAvatarUrl(url);
      }
    };
    fetchAvatar();
  }, [user, getUserAvatarUrl]);

  const handleAction = (action: 'myQuizzes' | 'editProfile') => {
    onSelectOption(action);
    onClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Kijelentkezési hiba:', error);
      toasterror('Hiba történt a kijelentkezés során.', ErrorOptions);
    }
    onClose();
  };

  const isAdmin = user?.role === true;
  const headerText = isAdmin ? 'Adminisztrátor menü' : 'Profil Menü';
  const myQuizzesText = isAdmin ? 'Felhasználók által készített kvízek' : 'Saját kvízek';

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="opaque" placement="center">
      <ModalContent>
        <ModalHeader style={isAdmin ? { color: 'red' } : {}}>{headerText}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className='w-full flex flex-col items-center gap-3'>
              <Image
                src={avatarUrl}
                alt="Selected Profile Picture"
                width={100}
                height={100}
                className="w-40 h-40 object-cover rounded-full"
                style={{
                  border: '0.15rem solid #000',
                }}
              />
              <div className='text-large'>{user?.username}</div>
            </div>

            <Button onPress={() => handleAction('myQuizzes')}>{myQuizzesText}</Button>
            <Button onPress={() => handleAction('editProfile')}>Profil szerkesztése</Button>
            <Divider className="my-4" style={{ background: 'red', height: '0.2rem' }} />
            <Button color="danger" variant="solid" onPress={handleLogout}>
              Kijelentkezés
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Bezárás
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileOptionsModal;