import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ) {
        if (!credentials) {
          return null;
        }

        const { username, password } = credentials;

        if (!username || !password) {
          return null;
        }
        //connect to database
        await dbConnect();

        const user = await UserModel.findOne({ username }).select("+password");

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return null;
        }
        return {
          id: user.id,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.user = {
        id: token.sub,
        username: token.username,
      };
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.sub = user.id;
        token.username = user.username;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
