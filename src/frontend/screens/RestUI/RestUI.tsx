import React, { PropsWithChildren } from 'react'
import { useParams } from 'react-router-dom'
import { AppScreenProps, ClassNameHelper, Heading, Link, List } from 'pizi-react'

interface RestUIProps extends AppScreenProps, PropsWithChildren{
    className?: string
}
 
export const RestUI: React.FC<RestUIProps> = (props) => {
    const { collectionName } = useParams()

    const items = ["users", "roles"].map((allowedCollectionName) => <Link size='large' className={ClassNameHelper({active: collectionName === allowedCollectionName})} to={`/rest/${allowedCollectionName}`}>{allowedCollectionName}</Link>)

    return  <div className="pizi-container rest">
                <Heading tag="h2">REST API</Heading>
                <div className="collections">
                    <Heading tag="h3" color='teritary'>Collections</Heading>
                    <List items={items} styleType='arrow' size="large"/>
                </div>
                <div className="pizi-container detail">{props.children}</div> 
            </div>
}