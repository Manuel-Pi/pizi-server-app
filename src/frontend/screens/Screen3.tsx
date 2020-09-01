import React, { useState, useEffect, CSSProperties } from 'react';

type Screen1Props = {
    className?: string
}
 
export const Screen3 = ({className}:Screen1Props) => {
    const[inputValue, setInputValue] = useState("");
    return  <div className={"screen3 " + className}>
                Screen3
            </div>
}