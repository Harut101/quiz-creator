import React from 'react'
import '../Button/Button.css'


const Button = (props) => {
    
    return(
        <button 
        onClick={props.onClick}
        disabled={props.disable}
        type={props.type}
        className={`Button ${props.cls}`}
        >
            {props.children}
        </button>
    )
}


export default Button;