let Button = (props) => {
    return(
        <button {...props.data}>{props.children}</button>
    )
}

export default Button;