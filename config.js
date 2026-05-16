const config = {
  appName: "PREP Copilot",
  appDescription:
    "Asistencia computacional con control humano para el Programa de Resultados Electorales Preliminares del IEE Chihuahua.",
  domainName: "localhost:3000",
  auth: {
    loginUrl: "/signin",
    callbackUrl: "/dashboard",
  },
};

export default config;
