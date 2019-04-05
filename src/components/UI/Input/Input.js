import React from 'react'
import '../Input/Input.css'    

const Input = (props) => {
    let cls = '';
    if(!props.isValid && props.isValid !== undefined && props.isTouched){
        cls = 'errorInput'
    }
    
    const type = props.type || 'text';
    let id = `Input-${(Math.random() * 10000000).toFixed()}`
    return(
        <div className={`Input`}>
            <label htmlFor={id}>{props.label}</label>
            <input 
             className={`${cls}`}
             id={id} 
             type={type}  
             value={props.value}
             onChange={(event) => props.onChange(event.target.value, props.name)}
             />
        </div>
    )
}


export default Input;