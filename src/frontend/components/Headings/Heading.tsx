import { Heading } from 'pizi-react'
import { HeadingProps } from 'pizi-react/src/components/Typography/Heading/Heading.js'
import React from 'react'

export const H = ({...props}: HeadingProps) => {
    switch(props.tag){
    case "h3":
        props.color ||= "teritary"
        break
    }
    return  <Heading {...props}>{props.children}</Heading>
}