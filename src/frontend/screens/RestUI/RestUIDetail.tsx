import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { REST, TokenContext } from 'pizi-react'

type RestUIDetailProps = {
    className?: string
}

let oldCollectionName: string | undefined
 
export const RestUIDetail = ({className}:RestUIDetailProps) => {
    const[json, setJson] = useState([])
    let { collectionName } = useParams()
    const token = useContext(TokenContext)

    async function getDocuments(){
        try{
            const json = await REST.list(collectionName!)
            setJson(json)
            oldCollectionName = collectionName
        } catch(e){

        }
    }

    const renderObject = (object: any, keyPrefix = "") => {
        if(!object) return;
        if(Array.isArray(object)){
            return  <div className="json-array">
                        {
                            object.map((item, index) => renderObject(item, index.toString()))
                        }
                    </div>
        } else if(typeof object === "string" || typeof object === "boolean" || typeof object === "number"){
            return <span key={keyPrefix} className="json-string">{object}</span>
        } else if(typeof object === "object"){
            return  <div className="json-object" key={keyPrefix}>
                        {
                            Object.keys(object).map((key) =>   <div key={keyPrefix + key} className={"json-object-value" + typeof object[key]}>
                                                                    <span className="json-object-key">{key}</span>
                                                                    {renderObject(object[key], keyPrefix + key)}
                                                                </div>)
                        }
                    </div>
        }
    };

    if(token && collectionName && (collectionName !== oldCollectionName || !json.length)) getDocuments()

    return  <div className={"rest-ui-detail " + className}>
                {renderObject(json)}
            </div>
}