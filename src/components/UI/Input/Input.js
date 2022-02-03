import React from 'react';
let Input = (props) => {
    return (
        <input {...props.data}>{props.children}</input>
    )
}

export default Input;