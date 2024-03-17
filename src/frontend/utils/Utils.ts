import { createContext } from "react"

export interface IServerAPI{
    users?: {
        findOne:( filter: any ) => any
        find:( filter: any ) => any[]
    }
}

export const ServerContext = createContext<IServerAPI | null | undefined>(null)

export const ClientContext = createContext<boolean>(false)