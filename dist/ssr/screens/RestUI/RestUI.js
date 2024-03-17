import React from 'react';
import { useParams } from 'react-router-dom';
import { ClassNameHelper, Heading, Link, List } from 'pizi-react';
import { Outlet } from 'react-router-dom';
export const RestUI = (props) => {
    const { collectionName } = useParams();
    const items = ["users", "roles"].map((allowedCollectionName) => React.createElement(Link, { size: 'large', className: ClassNameHelper({ active: collectionName === allowedCollectionName }), to: `/rest/${allowedCollectionName}` }, allowedCollectionName));
    return React.createElement("div", { className: "pizi-container rest" },
        React.createElement(Heading, { tag: "h2" }, "REST API"),
        React.createElement("div", { className: "collections" },
            React.createElement(Heading, { tag: "h3", color: 'teritary' }, "Collections"),
            React.createElement(List, { items: items, styleType: 'arrow', size: "large" })),
        React.createElement("div", { className: "pizi-container detail" },
            React.createElement(Outlet, null)));
};
