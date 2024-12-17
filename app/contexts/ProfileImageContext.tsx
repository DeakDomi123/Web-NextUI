'use client';
import React, { createContext, useContext, useState } from 'react';
import pb from '../authentication/PocketBaseClient';
import avatarImages from '../assets/avatarImages';

interface ProfileImageContextType {
  getUserAvatarUrl: (user: any) => Promise<string>;
  fetchCustomImage: (userId: string) => Promise<string | null>;
}

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(undefined);

export const ProfileImageProvider = ({ children }: { children: React.ReactNode }) => {
  const getUserAvatarUrl = async (user: any): Promise<string> => {
    if (!user) return avatarImages['avatar1'].src;
    if (user.profile_picture === 'custom') {
      try {
        const existingRecord = await pb.collection('userProfileImages').getFirstListItem(`user_id="${user.id}"`);
        if (existingRecord?.image) {
          return pb.getFileUrl(existingRecord, existingRecord.image);
        }
      } catch (error) {
        console.error("Avatar lekérési hiba:", error);
      }
    }

    if (avatarImages[user.profile_picture]) {
      return avatarImages[user.profile_picture].src;
    }
    return avatarImages['avatar1'].src;
  };

  const fetchCustomImage = async (userId: string): Promise<string | null> => {
    try {
      const existingRecord = await pb.collection("userProfileImages").getFullList({
        filter: `user_id="${userId}"`,
      });
      if (existingRecord.length > 0 && existingRecord[0].image) {
        return pb.getFileUrl(existingRecord[0], existingRecord[0].image);
      }
    } catch (error) {
      console.error("Custom kép lekérési hiba:", error);
    }
    return null;
  };

  return (
    <ProfileImageContext.Provider value={{ getUserAvatarUrl, fetchCustomImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};

export const useProfileImage = () => {
  const context = useContext(ProfileImageContext);
  if (!context) {
    throw new Error("useProfileImage must be used within a ProfileImageProvider");
  }
  return context;
};