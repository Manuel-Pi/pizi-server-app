import React, { useState, useEffect, CSSProperties } from 'react';

type Screen1Props = {
    className?: string
}
 
export const Screen2 = ({className}:Screen1Props) => {
    const[inputValue, setInputValue] = useState("");
    return  <div className={"screen2 " + className}>
                Screen2
            </div>
}