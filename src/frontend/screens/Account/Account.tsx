import React, { Suspense, use, useMemo } from 'react'
import { Button, Heading, SelectInput, Spinner, TextInput, Token } from 'pizi-react'
import { AppContext } from '../../utils/Utils.js'
 
type UserRolesProps = {
    userRolesPromise: React.Usable<any[]>
}

export const Account = () => {
    const { api: API, ...appContext } = use(AppContext)
    
    async function loginLogout(){
        if(appContext.user){
            await Token.clearToken()
            location.href = "/"
        } else {
            location.href = "/api/app/login"
        }
    }

    function UserRoles({userRolesPromise}: UserRolesProps){
        const userRoles = use(userRolesPromise)
        return <SelectInput label="roles" itemsSize={4} loading={!userRoles.length} options={userRoles.map((role: any) => ({label: role.name}))} multiple readOnly/>
    }

    function getUserRoles(){
        if(!API?.users || !appContext?.user?.id) return Promise.resolve([])
        return API.users.queries.getRoles(appContext.user.id).catch((e: Error) => { return []})
    }

    const userRolesPromise = useMemo(() => getUserRoles(), [appContext.user])

    return  <div className="pizi-container account">
                <Heading tag="h2">Account</Heading>
                <div className="pizi-container user-infos">
                {    
                    appContext.user ?  <>
                                <TextInput label="username" defaultValue={appContext.user.username} readOnly/>
                                <TextInput label="email" defaultValue={appContext.user.email} readOnly/>
                                <Suspense fallback={<SelectInput label="roles" itemsSize={4} loading={true} multiple readOnly options={[]}/>}><UserRoles userRolesPromise={userRolesPromise}/></Suspense>
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