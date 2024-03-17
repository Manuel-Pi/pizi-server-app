/// <reference types="react" />
export interface IServerAPI {
    users?: {
        findOne: (filter: any) => any;
        find: (filter: any) => any[];
    };
}
export declare const ServerContext: import("react").Context<IServerAPI | null | undefined>;
export declare const ClientContext: import("react").Context<boolean>;
