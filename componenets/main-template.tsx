import React from "react";
import Head from "next/head";

interface IThisProps {
  title: string;
  children: React.ReactNode;
}

function MainTemplate({ title, children }: IThisProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,300;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://kit-pro.fontawesome.com/releases/v5.15.4/css/pro.min.css"
          rel="stylesheet"
        />
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
}

export default MainTemplate;
