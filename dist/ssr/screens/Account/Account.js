import React, { Suspense, use, useMemo } from 'react';
import { Button, Heading, SelectInput, TextInput, Token } from 'pizi-react';
import { AppContext } from '../../utils/Utils.js';
export const Account = () => {
    const { api: API, ...appContext } = use(AppContext);
    async function loginLogout() {
        if (appContext.user) {
            await Token.clearToken();
            location.href = "/";
        }
        else {
            location.href = "/api/app/login";
        }
    }
    function UserRoles({ userRolesPromise }) {
        const userRoles = use(userRolesPromise);
        return React.createElement(SelectInput, { label: "roles", itemsSize: 4, loading: !userRoles.length, options: userRoles.map((role) => ({ label: role.name })), multiple: true, readOnly: true });
    }
    function getUserRoles() {
        if (!API?.users || !appContext?.user?.id)
            return Promise.resolve([]);
        return API.users.queries.getRoles(appContext.user.id).catch((e) => { return []; });
    }
    const userRolesPromise = useMemo(() => getUserRoles(), [appContext.user]);
    return React.createElement("div", { className: "pizi-container account" },
        React.createElement(Heading, { tag: "h2" }, "Account"),
        React.createElement("div", { className: "pizi-container user-infos" }, appContext.user ? React.createElement(React.Fragment, null,
            React.createElement(TextInput, { label: "username", defaultValue: appContext.user.username, readOnly: true }),
            React.createElement(TextInput, { label: "email", defaultValue: appContext.user.email, readOnly: true }),
            React.createElement(Suspense, { fallback: React.createElement(SelectInput, { label: "roles", itemsSize: 4, loading: true, multiple: true, readOnly: true, options: [] }) },
                React.createElement(UserRoles, { userRolesPromise: userRolesPromise })),
            React.createElement(Button, { className: "logout", appearance: "fill", onClick: loginLogout, color: "error" }, "sign out"))
            :
                React.createElement(React.Fragment, null,
                    React.createElement(Button, { appearance: "fill", onClick: loginLogout }, "sign in"))));
};
