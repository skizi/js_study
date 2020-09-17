/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly NEXT_PUBLIC_AUTH0_DOMAIN: string;
    readonly NEXT_PUBLIC_AUTH0_CLIENT_ID: string;
    readonly NEXT_PUBLIC_AUTH0_AUDIENCE: string;
    readonly NEXT_PUBLIC_AUTH0_SCOPE: string;
    readonly NEXT_PUBLIC_NAVI_API_ENDPOINT: string;
    readonly NEXT_PUBLIC_NAVI_API_ENDPOINT_SP: string;
    readonly NEXT_PUBLIC_OKAMI_API_ENDPOINT: string;
  }
}
