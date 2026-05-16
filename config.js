const config = {
  appName: "hackiee",
  appDescription:
    "Next.js 16 boilerplate with NextAuth + MongoDB + atomic components",
  domainName: "localhost:3000",
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
};

export default config;
