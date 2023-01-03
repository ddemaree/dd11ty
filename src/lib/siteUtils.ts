export function getSiteEnvironment() {
  return process.env.VERCEL_ENV ?? process.env.NODE_ENV;
}

export function isDevelopment() {
  return getSiteEnvironment() === "development";
}

export function isProduction() {
  return getSiteEnvironment() === "production";
}
