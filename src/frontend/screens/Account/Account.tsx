import React, { useEffect, useState } from 'react'
import { AppScreenProps, Button, Heading, SelectInput, Table, TextInput } from 'pizi-react'
import { Token } from '../../utils/Token'

type AccountProps = AppScreenProps & {
    user?: any
}
 
export const Account = ({user = {}}: AccountProps) => {

    const [roles, setRoles] = useState<any[]>([])

    async function loginLogout(){
        if(user){
            await Token.clearToken()
            location.href = "/"
        } else {
            window.location.href = "/api/app/login"
        }
    }

    async function getRoles(userId: string){
        const response = await fetch(`/api/rest/users/${userId}/roles`, { headers: { 'Content-Type': 'application/json' }})
        if(response.status === 200){
            const roles = await response.json()
            setRoles(roles)
        }
    }

    useEffect(() => {
        if(user) getRoles(user.id)
    }, [user])

    return  <div className="pizi-container account">
                <Heading tag="h2">Account</Heading>
                <div className="pizi-container user-infos">
                {    
                    user ?  <>
                                <TextInput label="username" defaultValue={user.username} readOnly/>
                                <TextInput label="email" defaultValue={user.email} readOnly/>
                                <SelectInput label="roles" options={roles.map(role => ({label: role.name}))} multiple readOnly/>
                                <Button className="logout" appearance="fill" onClick={loginLogout} color="error">sign out</Button>
                            </>
                        :
                            <>
                                <Button appearance="fill"onClick={loginLogout}>sign in</Button>
                            </>
                }
                </div>
            </div>
}