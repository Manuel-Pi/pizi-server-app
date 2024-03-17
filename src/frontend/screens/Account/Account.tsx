import React, { useEffect, useState } from 'react'
import { Button, Heading, REST, SelectInput, TextInput, Token } from 'pizi-react'

type AccountProps = {
    user?: any
}
 
export const Account = (props: AccountProps) => {

    const [roles, setRoles] = useState<any[]>([])

    async function loginLogout(){
        if(props.user){
            await Token.clearToken()
            location.href = "/"
        } else {
            window.location.href = "/api/app/login"
        }
    }

    async function getRoles(userId: string){
        const roles = await REST.get('users', userId, 'roles')
        setRoles(roles)
    }

    useEffect(() => {
        if(props.user) getRoles(props.user.id)
    }, [props.user])

    return  <div className="pizi-container account">
                <Heading tag="h2">Account</Heading>
                <div className="pizi-container user-infos">
                {    
                    props.user ?  <>
                                <TextInput label="username" defaultValue={props.user.username} readOnly/>
                                <TextInput label="email" defaultValue={props.user.email} readOnly/>
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