import React, {Component} from 'react'
import '../Layout/Layout.css'
import Menu from '../../components/Menu/Menu'
import Drawer from '../../components/Drawer/Drawer'
import Button from '../../components/UI/Button/Button'
import { connect } from 'react-redux'
import {logOut, login} from '../../store/actions/auth'

class Layout extends Component{
state = {
    menu: false
}

componentDidMount(){
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');

    let obj = {};
    obj.email = email;
    obj.password = password;
    obj.returnSecureToken = true;

    if(email && password){
        this.props.login(obj);
    }
}

onToggelMenu = () => {
    this.setState({
        menu: !this.state.menu
    })
}

LOGOUT = () => {
    localStorage.clear();
    this.props.logOut();
}

    render(){
        return(
            <div className="Layout">
               {
                   this.props.isLoginUser 
                   ?  <Button cls='LOGOUT' onClick={this.LOGOUT}>
                         LOGOUT
                      </Button>
                   : null
                }

                <Menu
                isOpen={this.state.menu} 
                toggelMenu={this.onToggelMenu}
                 />
                 <Drawer 
                   isOpen={this.state.menu} 
                   toggelMenu={this.onToggelMenu}
                 />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        isLoginUser: state.authReducer.isLoginUser 
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        logOut: () =>{dispatch(logOut())},
        login: (obj) =>{dispatch(login(obj))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);