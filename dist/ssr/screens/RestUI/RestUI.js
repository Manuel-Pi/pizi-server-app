import React, { useState } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { Heading, SelectInput } from 'pizi-react';
export const RestUI = (props) => {
    const { collectionName } = useParams();
    const [selectedCollection, setSelectedCollection] = useState(collectionName || "");
    const selectItems = [
        "",
        "users",
        "roles",
        "oauthTokens",
        "oauthClients",
        "oauthAuthorizationCodes"
    ].map(label => ({ label, selected: label === selectedCollection }));
    return React.createElement("div", { className: "pizi-container rest" },
        React.createElement(Heading, { tag: "h2" }, "REST API"),
        React.createElement("div", { className: "collections" },
            React.createElement(Heading, { tag: "h3", color: 'teritary' },
                "Collections: ",
                React.createElement(SelectInput, { options: selectItems, onChange: setSelectedCollection }))),
        selectedCollection && collectionName !== selectedCollection && React.createElement(Navigate, { to: `/rest/${selectedCollection}` }),
        React.createElement(Outlet, null));
};
