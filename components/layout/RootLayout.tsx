import React, { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div>children</div>
      <Footer />
    </>
  );
};

export default RootLayout;
