import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { REST, TokenContext } from 'pizi-react';
let oldCollectionName;
export const RestUIDetail = ({ className }) => {
    const [json, setJson] = useState([]);
    let { collectionName } = useParams();
    const token = useContext(TokenContext);
    async function getDocuments() {
        try {
            const json = await REST.list(collectionName);
            setJson(json);
            oldCollectionName = collectionName;
        }
        catch (e) {
        }
    }
    const renderObject = (object, keyPrefix = "") => {
        if (!object)
            return;
        if (Array.isArray(object)) {
            return React.createElement("div", { className: "json-array" }, object.map((item, index) => renderObject(item, index.toString())));
        }
        else if (typeof object === "string" || typeof object === "boolean" || typeof object === "number") {
            return React.createElement("span", { key: keyPrefix, className: "json-string" }, object);
        }
        else if (typeof object === "object") {
            return React.createElement("div", { className: "json-object", key: keyPrefix }, Object.keys(object).map((key) => React.createElement("div", { key: keyPrefix + key, className: "json-object-value" + typeof object[key] },
                React.createElement("span", { className: "json-object-key" }, key),
                renderObject(object[key], keyPrefix + key))));
        }
    };
    if (token && collectionName && (collectionName !== oldCollectionName || !json.length))
        getDocuments();
    return React.createElement("div", { className: "rest-ui-detail " + className }, renderObject(json));
};
