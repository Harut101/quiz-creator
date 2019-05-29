import React, {Component} from 'react'
import '../Layout/Layout.css'
import Menu from '../../components/Menu/Menu'
import Drawer from '../../components/Drawer/Drawer'
import Button from '../../components/UI/Button/Button'
import { connect } from 'react-redux'
import {logOut, login} from '../../store/actions/auth'
import { getUsers } from '../../helpers/userDataCare'

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

    this.props.getUsers();

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
                   ? <div className="profile-container">
                        <img src={this.props.userAvatar ? this.props.userAvatar : "https://cdn1.iconfinder.com/data/icons/business-charts/512/customer-512.png"} alt="avatar"/>
                        <Button cls='LOGOUT' onClick={this.LOGOUT}>
                         LOGOUT
                        </Button>
                     </div>
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
        isLoginUser: state.authReducer.isLoginUser,
        userAvatar: state.authReducer.userAvatar
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        logOut: () =>{dispatch(logOut())},
        login: (obj) =>{dispatch(login(obj))},
        getUsers: () =>{dispatch(getUsers())}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);