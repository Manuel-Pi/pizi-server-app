export type IQuery = (filters?: any) => Promise<any> | Promise<any[]>;
export type IMutation = (filters?: any) => Promise<any> | Promise<any[]>;
export interface ModelApi<T extends Object = any> extends IApi {
    queries: {
        get: (id: string) => Promise<T>;
        list: (filter: any) => Promise<T[]>;
    };
    mutations: {
        create: (model: T) => Promise<void>;
        update: (model: T) => Promise<void>;
        delete: (id: string) => Promise<void>;
    };
}
export interface IApi {
    queries?: {
        [key: string]: IQuery;
    };
    mutations?: {
        [key: string]: IMutation;
    };
}
export type IServerApi = {
    [key: string]: IApi;
};
export interface ServerApi extends IServerApi {
    users: ModelApi & {
        queries: {
            getRoles: (id: string) => Promise<any[]>;
        };
    };
    roles: ModelApi;
    oauthTokens: ModelApi;
    oauthClients: ModelApi;
    oauthAuthorizationCodes: ModelApi;
}
export interface IAppContext<ServerAPI> {
    browser: boolean;
    ssr: boolean;
    token?: string;
    user?: any;
    api?: ServerAPI;
}
export declare const AppContext: import("pizi-react").AppContext<ServerApi>;
