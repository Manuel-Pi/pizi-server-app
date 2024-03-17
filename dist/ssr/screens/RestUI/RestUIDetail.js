import React, { Suspense, use, useId, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, ButtonGroup, Json, Pagination, Spinner, Table } from 'pizi-react';
import { AppContext } from '../../utils/Utils.js';
import { createPortal } from 'react-dom';
export const RestUIDetail = ({}) => {
    const noRenderId = useId();
    const { collectionName } = useParams();
    const { api, browser } = use(AppContext);
    const noRenderInput = browser ? document.getElementById(noRenderId) : null;
    const [renderType, setRenderType] = useState('table');
    const [documents, setDocuments] = useState(noRenderInput?.value ? JSON.parse(noRenderInput?.value) : null);
    const countRef = useRef(null);
    const getDocuments = (collectionName) => {
        if (!api || !collectionName || !Object.keys(api).includes(collectionName)) {
            return Promise.resolve();
        }
        else {
            return api[collectionName].queries.list().catch((e) => console.error(e));
        }
    };
    const documentsPromise = useMemo(() => getDocuments(collectionName), [collectionName]);
    async function createUser() {
        const user = await api?.users.mutations.create({
            username: "testUser",
            email: 'test@test.ca'
        });
        console.log('user created with id: ' + user?.id);
    }
    return React.createElement("div", { className: "pizi-container rest-ui-detail" },
        React.createElement("input", { id: noRenderId, type: "hidden", value: JSON.stringify({}) }),
        React.createElement(ButtonGroup, { appearance: 'simple' },
            React.createElement("label", { className: 'total' },
                React.createElement("span", { ref: countRef }),
                "documents"),
            React.createElement(Button, { icon: "plus", onClick: () => setRenderType('table'), align: "right", className: renderType === "table" ? "selected" : "" }),
            React.createElement(Button, { icon: "table", onClick: () => setRenderType('table'), align: "right", className: renderType === "table" ? "selected" : "" }),
            React.createElement(Button, { icon: "code", onClick: () => setRenderType('json'), className: renderType === "json" ? "selected" : "" })),
        React.createElement("div", { className: 'pizi-container detail' },
            React.createElement(Suspense, { fallback: React.createElement(Spinner, { type: 'circle-notch' }) },
                React.createElement(Documents, { documentsPromise: documentsPromise, renderType: renderType, totalPortal: countRef }))));
};
function Documents({ documentsPromise, renderType, totalPortal }) {
    const documents = use(documentsPromise);
    let render = React.createElement(React.Fragment, null);
    switch (renderType) {
        case 'json':
            render = React.createElement(Json, { json: documents });
            break;
        case 'table':
            if (Array.isArray(documents) && documents.length)
                render = React.createElement(Table, { staticHeader: true, appearance: 'simple', header: Object.keys(documents[0]), data: documents.map(obj => Object.values(obj).map(value => React.createElement(Json, { json: value }))), className: 'pizi-table animate__animated animate__fadeIn' },
                    React.createElement(Pagination, null));
            break;
    }
    return React.createElement(React.Fragment, null,
        render,
        totalPortal?.current && createPortal(documents?.length || 0, totalPortal?.current));
}
