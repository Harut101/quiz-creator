import React from 'react';
import '../Menu/Menu.css'


const Menu = (props) =>{
    let cls = '';
    if(props.isOpen){
        cls = ' fa-times open'
    }else{
        cls = ' fa-bars'
    }
    return(
        <i 
        className={`Menu fa ${cls}`}
        onClick={props.toggelMenu}
        >

        </i>
    )
}
 
export default Menu;