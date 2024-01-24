import React from 'react';

type FooterProps = {
    className?: string
}
 
export const Footer = ({className}:FooterProps) => {
    return  <footer className={className}>
                PiziApp 2020
            </footer>
}