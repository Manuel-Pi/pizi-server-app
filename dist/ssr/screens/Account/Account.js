import React, { useEffect, useState } from 'react';
import { Button, Heading, REST, SelectInput, TextInput, Token } from 'pizi-react';
export const Account = (props) => {
    const [roles, setRoles] = useState([]);
    async function loginLogout() {
        if (props.user) {
            await Token.clearToken();
            location.href = "/";
        }
        else {
            window.location.href = "/api/app/login";
        }
    }
    async function getRoles(userId) {
        const roles = await REST.get('users', userId, 'roles');
        setRoles(roles);
    }
    useEffect(() => {
        if (props.user)
            getRoles(props.user.id);
    }, [props.user]);
    return React.createElement("div", { className: "pizi-container account" },
        React.createElement(Heading, { tag: "h2" }, "Account"),
        React.createElement("div", { className: "pizi-container user-infos" }, props.user ? React.createElement(React.Fragment, null,
            React.createElement(TextInput, { label: "username", defaultValue: props.user.username, readOnly: true }),
            React.createElement(TextInput, { label: "email", defaultValue: props.user.email, readOnly: true }),
            React.createElement(SelectInput, { label: "roles", options: roles.map(role => ({ label: role.name })), multiple: true, readOnly: true }),
            React.createElement(Button, { className: "logout", appearance: "fill", onClick: loginLogout, color: "error" }, "sign out"))
            :
                React.createElement(React.Fragment, null,
                    React.createElement(Button, { appearance: "fill", onClick: loginLogout }, "sign in"))));
};
