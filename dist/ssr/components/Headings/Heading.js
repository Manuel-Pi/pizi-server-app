import { Heading } from 'pizi-react';
import React from 'react';
export const H = ({ ...props }) => {
    switch (props.tag) {
        case "h3":
            props.color ||= "teritary";
            break;
    }
    return React.createElement(Heading, { ...props }, props.children);
};
