

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LpContextType = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  urls: string[];
  setUrls:  React.Dispatch<React.SetStateAction<string[]>>;
};

const LpContext = createContext<LpContextType | undefined>(undefined);

export function LpProvider({ children }: { children: ReactNode }) {

  const [files, setFiles] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const value = {
    files,
    setFiles,
    urls,
    setUrls
  };

  return <LpContext.Provider value={value}>{children}</LpContext.Provider>;
}

export function useLpContext() {
  const context = useContext(LpContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
