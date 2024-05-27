declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;

      // OPEN AI
      OPENAI_API_KEY: string;
      OPENAI_ORG_ID: string;
      OPENAI_PROJECT_ID: string;
    }
  }
}

export {};
