import React, { useState, useContext } from 'react';
import { Button, TokenContext } from 'pizi-react';
import { H } from '../../components/Headings/Heading.js';
import { ClientContext } from '../../utils/Utils.js';
export const Home = ({}) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const token = useContext(TokenContext);
    const client = useContext(ClientContext);
    setInterval(() => setCurrentTime(new Date()), 60000);
    return React.createElement("div", { className: "pizi-container home" }, !token ? React.createElement("div", { className: 'pizi-container public' },
        React.createElement("img", { src: "/icon.png" }),
        React.createElement(H, { tag: "h1" }, "Pizi Server"),
        React.createElement(H, { tag: "h3", color: "teritary" }, "A simple Node.js server providing oauth2 authentification"),
        React.createElement(Button, { appearance: "fill", onClick: () => window.location.href = "/api/app/login" }, "sign in"))
        :
            React.createElement(H, { tag: "h1" },
                "Pizi Server",
                React.createElement("span", { className: "date" },
                    React.createElement("div", { suppressHydrationWarning: true }, client ? [currentTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase(),
                        currentTime.toLocaleDateString('en-US', { day: 'numeric' }),
                        currentTime.toLocaleDateString('en-US', { month: 'long' }).toLowerCase(),
                        currentTime.toLocaleDateString('en-US', { year: 'numeric' })].join(" ") : ""),
                    React.createElement("div", { className: "time", suppressHydrationWarning: true }, client ? currentTime.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) : ""))));
};
