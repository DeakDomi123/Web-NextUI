'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import { RivetIconsMagnifyingGlass, MdiPlus } from '../assets/SvgIcons';
import { useAuth } from '../authentication/AuthContext';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import ProfileOptionsModal from '../Modals/ProfileOptionsModal';
import MyQuizzesModal from '../Modals/MyQuizzesModal';
import EditProfileModal from '../Modals/EditProfileModal';
import CreateQuizModal from '../Modals/CreateQuizModal';
import avatarImages from '../assets/avatarImages';
import { useRouter } from 'next/navigation';
import {BackIcon} from "@/components/BackIcon";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from '@nextui-org/react';
import { categoriesCap } from '../quiz/categories';
import * as icons from '../assets/SvgIcons';

const difficulties = [
  { label: 'Könnyű', icon: <icons.MynauiSquareSolid /> },
  { label: 'Közepes', icon: <icons.MynauiSquareSolid2 /> },
  { label: 'Nehéz', icon: <icons.MynauiSquareSolid3 /> },
];

export default function Header({ quizMainHeaderMode, backButton }: { quizMainHeaderMode: boolean, backButton: any | null }) {
  const [isProfileOptionsOpen, setIsProfileOptionsOpen] = useState(false);
  const [isMyQuizzesOpen, setIsMyQuizzesOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);

  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Összes kategória"]));
  const [selectedKeys2, setSelectedKeys2] = React.useState(new Set(["Összes nehézség"]));

  const selectedValue = React.useMemo(
    () => { let x = Array.from(selectedKeys); return x; },
    [selectedKeys],
  );
  const selectedValue2 = React.useMemo(
    () => { let x = Array.from(selectedKeys2); return x; },
    [selectedKeys2],
  );


  useEffect(() => {
    if(!quizMainHeaderMode)
      return;
    const timeoutId = setTimeout(() => {
      if (searchTerm || selectedValue[0] || selectedValue2[0]) {
        let catq = selectedValue[0] == "Összes kategória" ? '' : selectedValue[0];
        let diffq = selectedValue2[0] == "Összes nehézség" ? '' : selectedValue2[0];

        let path = '?';
        if(searchTerm)
          path +=`search=${encodeURIComponent(searchTerm)}`;
        if(catq) {
          if(path.length > 1)
            path += '&';
          path +=`cat=${encodeURIComponent(catq)}`;
        }
        if(diffq) {
          if(path.length > 1)
            path += '&';
          path +=`diff=${encodeURIComponent(diffq)}`;
        }
        router.push(path);
      } else {
        router.push(`/quiz`);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, router, selectedValue, selectedValue2]);

  const handleAvatarClick = () => {
    setIsProfileOptionsOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreateQuizOpen(true);
  };

  const handleCloseProfileOptions = () => {
    setIsProfileOptionsOpen(false);
  };

  const handleSelectOption = (option: 'myQuizzes' | 'editProfile') => {
    if (option === 'myQuizzes') {
      setIsMyQuizzesOpen(true);
    } else if (option === 'editProfile') {
      setIsEditProfileOpen(true);
    }
  };

  const handleCloseMyQuizzes = () => {
    setIsMyQuizzesOpen(false);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
  };

  const handleCloseCreateQuiz = () => {
    setIsCreateQuizOpen(false);
  }

  const getAvatar = () => {
    if (user?.profile_picture && avatarImages[user.profile_picture]) {
      return avatarImages[user.profile_picture];
    }
    return "/assets/images/avatar1.png";
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className='flex flex-row grow'>

        {backButton != null &&
        <Button onClick={backButton} className={styles.backButton} isIconOnly variant="faded" aria-label="Vissza">
          <BackIcon/>
        </Button>
        }

        {quizMainHeaderMode &&
          <div className={styles.inputContainer}>
            <input
              key='default'
              type="text"
              placeholder="Keress kód vagy készítő alapján..."
              className={styles.customInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RivetIconsMagnifyingGlass style={{margin: '4 4 4 4', width: '1.4rem', paddingBottom: '.5rem'}} className={styles.icon} />
          </div>
        }
        {quizMainHeaderMode &&    
          <Dropdown shouldBlockScroll={false} style={{overflow: 'auto'}}>
            <DropdownTrigger>
              <Button color='primary' style={{marginLeft:'.4rem', height: '48px', background: 'rgb(0, 112, 240)', color: 'rgba(255, 255, 255, 0.9)'}} className="capitalize" variant="bordered">
              <div className={styles.catdropdowndiv2}>
                    {categoriesCap.find((x) => x.label == selectedValue[0])?.icon}
                    {selectedValue}
                  </div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Kategória szűrés"
              selectionMode="single"
              variant="flat"
              color='primary'
              selectedKeys={selectedKeys}
              onSelectionChange={(x) => setSelectedKeys(x as Set<string>)}
            >
              {[{ label: 'Összes kategória', icon: <div></div>}].concat(categoriesCap).map((cat) => (
                <DropdownItem key={cat.label}>
                  <div style={{minHeight: '2rem'}} className={styles.catdropdowndiv}>
                    {cat.icon}
                    {cat.label}
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        }
        {quizMainHeaderMode &&
          <Dropdown>
            <DropdownTrigger>
              <Button color='primary' style={{marginLeft:'.4rem', height: '48px', background: 'rgb(0, 112, 240)', color: 'rgba(255, 255, 255, 0.9)'}} className="capitalize" variant="bordered">
              <div className={styles.catdropdowndivnofill}>
                    {difficulties.find((x) => x.label == selectedValue2[0])?.icon}
                    {selectedValue2}
                  </div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Nehézség szűrés"
              selectionMode="single"
              variant="flat"
              color='primary'
              selectedKeys={selectedKeys2}
              onSelectionChange={(x) => setSelectedKeys2(x as Set<string>)}
            >
              {[{ label: 'Összes nehézség', icon: <div></div>}].concat(difficulties).map((cat) => (
                <DropdownItem key={cat.label}>
                  <div style={{minHeight: '2rem'}} className={styles.catdropdowndivnofill}>
                    {cat.icon}
                    {cat.label}
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        }
        </div>
        {quizMainHeaderMode &&
          <Button className={styles.createButton} onClick={handleCreateClick}>
            <span>Létrehozás</span>
            <MdiPlus />
          </Button>
        }
      </nav>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Kvízoldal</h1>
      </div>
      {user && (
        <div className={styles.avatarContainer}>
          <Image
            src={getAvatar()}
            alt="User Avatar"
            onClick={quizMainHeaderMode ? handleAvatarClick : () => {} }
            style={{ minWidth:65, cursor: 'pointer', borderRadius: '50%', border: '0.15rem solid #000', marginRight: '0.5rem' }}
            height={65}
            width={65}
          />
        </div>
      )}

      {/* Create Quiz Modal */}
      {quizMainHeaderMode &&
        <CreateQuizModal
        isOpen={isCreateQuizOpen}
        onClose={handleCloseCreateQuiz}
        />
      }

      {/* Profile Options Modal */}
      <ProfileOptionsModal
        isOpen={isProfileOptionsOpen}
        onClose={handleCloseProfileOptions}
        onSelectOption={handleSelectOption}
      />

      {/* My Quizzes Modal */}
      <MyQuizzesModal
        isOpen={isMyQuizzesOpen}
        onClose={handleCloseMyQuizzes}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={handleCloseEditProfile}
      />
    </header>
  );
};

function userRef<T>(arg0: null): [any, any] {
  throw new Error('Function not implemented.');
}
