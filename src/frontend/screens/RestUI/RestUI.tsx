import React, { PropsWithChildren, useState } from 'react'
import { useParams, Outlet, redirect, Navigate } from 'react-router-dom'
import { ClassNameHelper, Heading, Link, List, SelectInput } from 'pizi-react'

interface RestUIProps extends PropsWithChildren{
    className?: string
}
 
export const RestUI: React.FC<RestUIProps> = (props) => {
    const { collectionName } = useParams()
    const [selectedCollection, setSelectedCollection] = useState<string>(collectionName || "")

    const selectItems = [
        "",
        "users",
        "roles",
        "oauthTokens",
        "oauthClients",
        "oauthAuthorizationCodes"
    ].map(label => ({ label, selected: label === selectedCollection }))

    return  <div className="pizi-container rest">
                <Heading tag="h2">REST API</Heading>
                <div className="collections">
                    <Heading tag="h3" color='teritary'>Collections: <SelectInput options={selectItems} onChange={setSelectedCollection}/></Heading>
                </div>
                {selectedCollection && collectionName !== selectedCollection && <Navigate to={`/rest/${selectedCollection}`}/>}
                <Outlet/>
            </div>
}