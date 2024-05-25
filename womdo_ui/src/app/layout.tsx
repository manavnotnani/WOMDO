import { bubblegumSans } from "@/fonts/fonts";
import type { Metadata } from "next";
import Head from "next/head";
import "./index.scss";


export const metadata: Metadata = {
  title: "WOMDO",
  description: "",
  keywords: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${bubblegumSans.variable}`}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      <body>
        {/* <Loader /> */}
        {children}
      </body>
    </html>
  );
}
