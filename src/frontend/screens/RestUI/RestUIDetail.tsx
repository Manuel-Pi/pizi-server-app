import React, { useState, useEffect, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';

type RestUIDetailProps = {
    className?: string
}

let oldCollectionId: string;
 
export const RestUIDetail = ({className}:RestUIDetailProps) => {
    const[json, setJson] = useState([]);
    let { collectionId } = useParams();

    const getJson = () => {
        fetch("/pizi-rest/" + collectionId, {
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => response.json())
        .then(json => setJson(json));
        oldCollectionId = collectionId;
    }

    const renderObject = (object: any) => {
        if(!object) return;
        if(Array.isArray(object)){
            return  <div className="json-array">
                        {
                            object.map(item =>  renderObject(item))
                        }
                    </div>
        } else if(typeof object === "string" || typeof object === "boolean" || typeof object === "number"){
            return <span className="json-string">{object}</span>
        } else if(typeof object === "object"){
            return  <div className="json-object">
                        {
                            Object.keys(object).map((key) =>   <div className={"json-object-value" + typeof object[key]}>
                                                                                <span className="json-object-key">{key}</span>
                                                                                {renderObject(object[key])}
                                                                            </div>)
                        }
                    </div>
        }
    };

    if(collectionId && collectionId !== oldCollectionId) getJson();

    return  <div className={"rest-ui-detail " + className}>
                {renderObject(json)}
            </div>
}