import React from "react";
import Header from "@/components/organisms/Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800">
      <Header />
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;