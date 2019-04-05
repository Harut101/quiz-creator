import React, {Component} from 'react'
import '../Drawer/Drawer.css'
import BackDrop from '../BackDrop/BackDrop'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';

let Link = [
    {to: '/auth', label: 'Авториация', exact: true},
    {to: '/quiz-list', label: 'Список', exact: false},
    {to: '/quiz-creator', label: 'Создать Тест', exact: false},
]

class Drawer extends Component{

    generateLink = () => {
        let menuSection = Link;

        if(this.props.token) {
            menuSection =  Link.filter(link => link.to !== '/auth');
        }
        
        return  menuSection.map((link, index) => {
                return(
                    <React.Fragment key={index}>
                        <li 
                        key={index}
                        onClick={this.props.toggelMenu}
                        >
                            <NavLink to={link.to} exact={link.exact}>
                                {link.label}
                            </NavLink>
                            
                        </li>
                    </React.Fragment>
                )
            })
        
    }

    render(){
        let cls = ''
        if(!this.props.isOpen){
             cls = 'close'
        }
        return(
            <>
                <nav className={`Drawer ${cls}`}>
                    <h3>MENU</h3>
                    <ul>
                    {this.generateLink()}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop toggelMenu={this.props.toggelMenu}/> : null}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        token: state.authReducer.token 
    }
}


export default connect(mapStateToProps, null)(Drawer);