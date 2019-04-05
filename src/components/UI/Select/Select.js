import React from 'react';
import '../Select/Select.css';

const Select = props => {
    let id = `Select-${(Math.random() * 10000000).toFixed()}`;
    
    return(
        <div className={`Select`}>
            <label htmlFor={id}>{props.label}</label>
            <select name="select" id={id} onChange={(e) => props.onChange(e.target.value, props.name)} defaultValue={props.selectedOption}>
                    {
                      props.options.map((option, index) => {
                         return(
                            <option value={option} key={index}>
                                {option}
                            </option>
                         )
                      })
                    }
            </select>
        </div>
    )
}


export default Select