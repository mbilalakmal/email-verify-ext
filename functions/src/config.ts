function readEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`The environment variable '${name}' is not set`);
  }
  return value;
}

function readEnvPrivateKey(name: string): string {
  const privateKey = readEnv(name);
  return `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
}

export const config = {
  webApiKey: readEnv("WEB_API_KEY"),
  serviceAccountProjectId: readEnv("SERVICE_ACCOUNT_PROJECT_ID"),
  serviceAccountEmail: readEnv("SERVICE_ACCOUNT_EMAIL"),
  serviceAccountPrivateKey: readEnvPrivateKey("SERVICE_ACCOUNT_PRIVATE_KEY"),
};
