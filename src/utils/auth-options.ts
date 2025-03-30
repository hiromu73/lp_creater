import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import GithubProvider from "next-auth/providers/github";

interface ExtendedJWT extends JWT {
  customField?: string;
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  logger: {
    error(code, metadata) {
      console.error("Auth Error:", { code, metadata });
    },
    warn(code) {
      console.warn("Auth Warning:", code);
    },
    debug(code, metadata) {
      console.debug("Auth Debug:", { code, metadata });
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID ?? "",
    //   clientSecret: process.env.APPLE_SECRET ?? "",
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      // ログイン成功後のリダイレクト先を指定
      console.log(`auth-options - ${baseUrl}`);
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // デフォルトのリダイレクト先
      return baseUrl;
    },

    async jwt({ token, account }) {
      const extendedToken = token as ExtendedJWT;

      if (account) {
        // 初回サインイン時の処理
        extendedToken.customField = "some value";
      }

      return extendedToken;
    },
    async session({ session, token }) {
      // セッションにカスタムフィールドを追加
      return {
        ...session,
        customField: (token as ExtendedJWT).customField,
      };
    },
  },
  // その他の設定...
};
