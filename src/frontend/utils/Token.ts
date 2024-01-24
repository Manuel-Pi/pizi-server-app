import { createContext } from "react"

let TOKEN: {
    accessToken: string,
    userId: string
} | null

const TOKEN_KEY = "token"

async function checkTokenIsValid(){
    const response = await fetch("/api/oauth/authenticate", { headers: Token.getAuthorizationHeader() })
    if(response.status !== 200) throw new Error('token not valid')
}

async function getTokenFromSession(){
    const response = await fetch("/api/app/token")
    if(response.status !== 200) throw new Error('cannot get token from session')
    TOKEN = await response.json()
    sessionStorage.setItem(TOKEN_KEY, JSON.stringify(TOKEN))
}

export const Token = {
    async getToken(){
        try{
            // Get token from sessionStorage
            if(!TOKEN){
                const tokenFromStorage = sessionStorage.getItem(TOKEN_KEY)
                if(tokenFromStorage) TOKEN = JSON.parse(tokenFromStorage)
                try{
                    if(TOKEN) await checkTokenIsValid()
                    else throw new Error("token not found")
                } catch(e){
                    await getTokenFromSession()
                }
            } 
        } catch(e){
            await this.clearToken()
            console.error(`cannot get token: ${e.message}`)
        }
        return TOKEN
    },
    async clearToken(){
        TOKEN = null
        sessionStorage.removeItem("token")
        await fetch("/api/app/logout")
    },
    getAuthorizationHeader(){
        return { Authorization: `Bearer ${TOKEN?.accessToken}` }
    }
}

export const TokenContext = createContext(null)