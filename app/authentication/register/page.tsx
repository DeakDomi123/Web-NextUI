'use client';

import React, { useState } from 'react';
import pb from '../PocketBaseClient';
import styles from './KvizoldalRegister.module.css';
import { useAuth } from '../AuthContext';
import { Input } from "@nextui-org/input";
import { Button } from '@nextui-org/button';
import { EyeSlashFilledIcon } from '@/components/EyeSlashFilledIcon';
import { EyeFilledIcon } from '@/components/EyeFilledIcon';

const RegisterPage: React.FC = () => {
  let emailInputElement = React.createRef<HTMLInputElement>();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [isVisible2, setIsVisible2] = React.useState(false);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  const validateEmail = (value: string) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const isInvalid = React.useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const doPasswordsMatch = React.useMemo(() => {
    if (password === "" || passwordConfirm === "") return false;
    return password !== passwordConfirm;
  }, [password, passwordConfirm]);

  // Jelszó hosszának ellenőrzése
  const isShortPassword = React.useMemo(() => {
    return password.length > 0 && password.length < 5;
  }, [password]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Ellenőrzés üres mezőkre
    if (!username || !email || !password || !passwordConfirm) {
      setError('Kérjük, töltsd ki az összes mezőt.');
      setLoading(false);
      return;
    }

    // Jelszavak ellenőrzése
    if (doPasswordsMatch) {
      setError('A két jelszó nem egyezik.');
      setLoading(false);
      return;
    }

    // Jelszó hosszának ellenőrzése
    if (isShortPassword) {
      setError('A jelszónak legalább 5 karakter hosszúnak kell lennie.');
      setLoading(false);
      return;
    }

    // E-mail ellenőrzés
    if (!validateEmail(email)) {
      setError('Kérjük érvényes emailt adjon meg.');
      emailInputElement.current?.focus(); 
      setLoading(false);
      return;
    }

    try {
      const existingUsername = await pb.collection('users').getFullList({
        filter: `username="${username}"`,
      });
      if (existingUsername.length > 0) {
        setError('A megadott felhasználónév már létezik.');
        setLoading(false);
        return;
      }

      const existingEmail = await pb.collection('users').getFullList({
        filter: `email="${email}"`,
      });
      if (existingEmail.length > 0) {
        setError('A megadott e-mail cím már regisztrálva van.');
        setLoading(false);
        return;
      }
    } catch {
      setError('Ismeretlen hiba történt, próbálja úrja később.');
      setLoading(false);
      return;
    }

    try {
      const data = {
        "username": username,
        "email": email,
        "emailVisibility": true,
        "password": password,
        "passwordConfirm": passwordConfirm,
        "profile_picture": "avatar1",
      };
      await pb.collection('users').create(data);
      await login(email, password);
    } catch (err: any) {
      setError('Hiba történt a regisztráció során: ' + ((error ? error : err.message) || 'Ismeretlen hiba.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.loginContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.loginFormWrapper}>
          <h1 className={styles.pageTitle}>Kvízoldal</h1>
          <section className={styles.formSection}>
            <div className={styles.formContent}>
              <header className={styles.formHeader}>
                <p className={styles.welcomeText}>Üdvözölünk</p>
                <h2 className={styles.loginPrompt}>Hozd létre a fiókodat!</h2>
              </header>
              <form className={styles.loginForm} onSubmit={handleRegister}>
                <div className={styles.inputWrapper}>
                  <Input
                    className={styles.inputField}
                    variant='faded'
                    label="Felhasználónév"
                    value={username}
                    isRequired
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                    className="inputField inputFieldTopM"
                    variant='faded'
                    isRequired
                    required
                    label="Email"
                    ref={emailInputElement}
                    value={email}
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "default"}
                    errorMessage="Kérjük érvényes emailt adjon meg"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    className={styles.inputField}
                    variant='faded'
                    isRequired
                    required
                    label="Jelszó"
                    value={password}
                    isInvalid={doPasswordsMatch || isShortPassword}
                    errorMessage={
                      isShortPassword ? 
                        "A jelszónak legalább 5 karakter hosszúnak kell lennie"
                        : ""
                    }
                    color={(doPasswordsMatch || isShortPassword) ? "danger" : "default"}
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    className={styles.inputField}
                    variant='faded'
                    isRequired
                    required
                    label="Jelszó megerősítése"
                    value={passwordConfirm}
                    isInvalid={doPasswordsMatch || isShortPassword}
                    color={(doPasswordsMatch || isShortPassword) ? "danger" : "default"}
                    errorMessage={
                      doPasswordsMatch ? "A két jelszó nem egyezik" : ""
                    }
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility2} aria-label="toggle password visibility">
                        {isVisible2 ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible2 ? "text" : "password"}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className={styles.submitButton} 
                  disabled={loading}
                  isLoading={loading}
                  size='lg'
                  color='primary'>
                    {loading ? 'Regisztrálás...' : 'Regisztráció'}
                </Button>
              </form>
              {error && <p className={styles.errorText}>{error}</p>}
              <div className={styles.registerPrompt}>
                Már van fiókod?{' '}
                <a href="/authentication/login" className={styles.registerLink}>
                  Jelentkezz be itt!
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;