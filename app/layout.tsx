import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import background from "../public/bcg.jpg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatApp",
  description: "ChatApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(${background.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={inter.className}
      >
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
