"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LpContextType = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  urls: string[];
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  result: LpResponse | null;
  setResult: React.Dispatch<React.SetStateAction<LpResponse | null>>;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
};

// LPレスポンスの型定義
interface LpResponse {
  html: string;
  css: string;
  preview_image?: string;
}

const LpContext = createContext<LpContextType | undefined>(undefined);

export function LpProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<LpResponse | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const value = {
    files,
    setFiles,
    urls,
    setUrls,
    loading,
    setLoading,
    result,
    setResult,
    activeTab,
    setActiveTab,
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
