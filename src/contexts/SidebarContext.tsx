import React, { FC, useState, createContext, ReactNode } from 'react';

type SidebarContextType = {
  sidebarToggle: boolean; // Alterado de `any` para `boolean`
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

type SidebarProviderProps = {
  children: ReactNode;
};

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setSidebarToggle((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
