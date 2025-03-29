
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      // 必要に応じて追加のプロパティ
    };
  }
}
