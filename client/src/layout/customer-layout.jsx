import Header from "@/components/Header";
import { ThemeProvider } from "@/utils/theme-provider";
import React from "react";
import { Outlet } from "react-router-dom";

export const CustomerLayout = () => {
  return (
    <ThemeProvider>
      <Header />
      <main className="pt-20 flex flex-col flex-1">
        <Outlet />
      </main>
    </ThemeProvider>
  );
};
