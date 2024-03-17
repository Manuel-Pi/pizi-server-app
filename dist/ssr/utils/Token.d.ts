/// <reference types="react" />
export declare const Token: {
    getToken(): Promise<{
        accessToken: string;
        userId: string;
    } | null>;
    clearToken(): Promise<void>;
    getAuthorizationHeader(): {
        Authorization: string;
    };
};
export declare const TokenContext: import("react").Context<null>;
