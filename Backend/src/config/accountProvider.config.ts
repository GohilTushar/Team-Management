export const accountProviderConfig = {
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  EMAIL: "EMAIL",
};

export type AccountProviderEnum = keyof typeof accountProviderConfig;