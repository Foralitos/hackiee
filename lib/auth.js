import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "./mongo";
import connectMongoose from "./mongoose";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  ...(clientPromise && { adapter: MongoDBAdapter(clientPromise) }),
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name || profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user",
          createdAt: new Date(),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role || "user";
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
        try {
          await connectMongoose();
          const dbUser = await User.findById(token.sub);
          session.user.role = dbUser?.role || "user";
        } catch (e) {
          console.error("session role lookup failed:", e);
          session.user.role = token.role || "user";
        }
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.role) {
        try {
          await connectMongoose();
          await User.findByIdAndUpdate(user.id, { role: "user" });
        } catch (e) {
          console.error("default role assignment failed:", e);
        }
      }
    },
  },
  session: { strategy: "jwt" },
});
