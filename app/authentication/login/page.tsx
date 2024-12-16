'use client';

import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import styles from './KvizoldalLogin.module.css';

import { Input } from "@nextui-org/input";
import { Button } from '@nextui-org/button';
import {EyeFilledIcon} from "@/components/EyeFilledIcon";
import {EyeSlashFilledIcon} from "@/components/EyeSlashFilledIcon";


const LoginPage: React.FC = () => {
  let emailInputElement = React.createRef<HTMLInputElement>();

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [emailValue, setEmailValue] = React.useState("");

  const validateEmail = (value: string) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const isInvalid = React.useMemo(() => {
    if (emailValue === "") return false;

    return validateEmail(emailValue) ? false : true;
  }, [emailValue]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if(!validateEmail(email))
      {
        emailInputElement.current?.focus(); 
        return;
      }

      await login(email, password);
    } catch {
      setError('Hiba történt a bejelentkezés során.');
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
                <div className={styles.welcomeText}>Üdv újra</div>
                <h2 className={styles.loginPrompt}>Jelentkezz be!</h2>
              </header>
              <form className={styles.loginForm} onSubmit={handleLogin}>
                <div className={styles.inputWrapper}>
                  <Input
                    className={styles.inputField}
                    isRequired
                    required
                    variant='faded'
                    label="Email"
                    ref={emailInputElement}
                    value={email}
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "default"}
                    errorMessage="Kérjük érvényes emailt adjon meg"
                    onValueChange={setEmailValue}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    className={styles.inputField}
                    isRequired
                    required
                    label="Jelszó"
                    variant='faded'
                    value={password}
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

                </div>
                <Button 
                  type="submit" 
                  className={styles.submitButton} 
                  disabled={loading}
                  isLoading={loading}
                  size='lg'
                  color='primary'>
                    {loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
                </Button>
                <div className={styles.errorText}>{error && <span>{error}</span>}</div>
              </form>
              <div className={styles.registerPrompt}>
                Új felhasználó?{' '}
                <a href="/authentication/register" className={styles.registerLink}>
                  Regisztrálj itt!
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
