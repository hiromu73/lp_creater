"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthCheck;
