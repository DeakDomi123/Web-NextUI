// components/ProfileOptionsModal.tsx

'use client';

import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from "@nextui-org/react";
import { useAuth } from '../authentication/AuthContext';
import avatarImages from '../assets/avatarImages';
import Image from "next/image";

interface ProfileOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: 'myQuizzes' | 'editProfile') => void;
}

const ProfileOptionsModal: React.FC<ProfileOptionsModalProps> = ({ isOpen, onClose, onSelectOption }) => {
  const { user } = useAuth();
  const { logout } = useAuth();
  
  const handleMyQuizzes = () => {
    onSelectOption('myQuizzes');
    onClose();
  };

  const handleEditProfile = () => {
    onSelectOption('editProfile');
    onClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Kijelentkezési hiba:', error);
      alert('Hiba történt a kijelentkezés során.');
    };
    onClose();
  }

  const getModal = (role: boolean) => {
    if (role) {
      return (
        <Modal isOpen={isOpen} onClose={onClose} backdrop="opaque" placement="center">
          <ModalContent>
            <ModalHeader style={{color: 'red'}}>Adminisztrátor menü</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className='w-full flex flex-col items-center gap-3'>
                    <Image
                      src={avatarImages[user?.profile_picture || "avatar1"] || "/assets/images/defaultAvatar.png"}
                      alt="Selected Profile Picture"
                      width={100}
                      height={100}
                      className="rounded-full"
                      />
                    <div className='text-large'>{user?.username}</div>
                  </div>

                <Button onPress={handleMyQuizzes}>Felhasználók által készített kvízek</Button>
                <Button onPress={handleEditProfile}>Profil szerkesztése</Button>
                <Divider className="my-4" style={{ background: 'red', height: '0.2rem' }} />
                <Button color="danger" variant="solid" onPress={handleLogout}>Kijelentkezés</Button>
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
    } else {
      return (
        <Modal isOpen={isOpen} onClose={onClose} backdrop="opaque" placement="center">
          <ModalContent>
            <ModalHeader>Profil Menü</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className='w-full flex flex-col items-center gap-3'>
                  <Image
                    src={avatarImages[user?.profile_picture || "avatar1"] || "/assets/images/defaultAvatar.png"}
                    alt="Selected Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-full"
                    />
                  <div className='text-large'>{user?.username}</div>
                </div>

                <Button onPress={handleMyQuizzes}>Saját kvízek</Button>
                <Button onPress={handleEditProfile}>Profil szerkesztése</Button>
                <Divider className="my-4" style={{ background: 'red', height: '0.2rem' }} />
                <Button color="danger" variant="solid" onPress={handleLogout}>Kijelentkezés</Button>
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
    }
  }

  return (
    getModal(user?.role ?? false)
  );
};

export default ProfileOptionsModal;
