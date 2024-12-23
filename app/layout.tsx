import "@/styles/globals.css";
import { AuthProvider } from './authentication/AuthContext';
import { ProfileImageProvider } from "./contexts/ProfileImageContext";
import './globals.css';
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";

export const metadata = {
  title: 'Kvízoldal',
  description: 'Egy kvízoldal, ahol kvízeket lehet kitölteni.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" suppressHydrationWarning>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light", forcedTheme: "light" }}>
          <AuthProvider>
            <ProfileImageProvider>
              {children}
            </ProfileImageProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
