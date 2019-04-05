import React from 'react'
import '../BackDrop/BackDrop.css'


const BackDrop = (props) => {
    return(
        <div className='Backdrop' onClick={props.toggelMenu} ></div>
    )
}


export default BackDrop;