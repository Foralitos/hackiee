import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Edge-compatible NextAuth config for middleware: no MongoDB adapter, no Email provider.
// Per-route protection is enforced in route group layouts via `auth()` (see app/(private)).
const { auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
});

export default auth(async function middleware() {});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
