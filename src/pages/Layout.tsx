import Footer from "@/components/self-made/Footer";
import Header from "@/components/self-made/Header";
import SearchBar from "@/components/self-made/SearchBar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <SearchBar /> */}
      <div className="flex-1 px-52">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
