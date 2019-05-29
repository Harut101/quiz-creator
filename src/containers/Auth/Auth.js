import React, {Component} from 'react';
import '../Auth/Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { validationAuth, formValidation } from '../../helpers/validation';
import { connect } from 'react-redux';
import {login, registration} from '../../store/actions/auth';
import Uploader from '../../components/Uploader/Uploader';
import { addAvatar } from '../../helpers/userDataCare'

class Auth extends Component{

    state = {
        authState: false,
        field: {
            email: {
                label: 'Email',
                type: 'email',
                value: '',
                valid: false,
                touched: false,
                validation:{
                    required: true,
                    validationMethod: /\S+@\S+\.\S+/
                }
            },
            password: {
                label: 'Password',
                type: 'password',
                value: '',
                valid: false,
                touched: false,
                validation:{
                    required: true,
                    validationMethod: 6
                }
            }
        }
    }

    renderInput() {
      let field = this.state.field;
      return Object.keys(field).map((fild, index) => {
        let field = this.state.field[fild];
           
            return(
                <Input 
                    label={field.label}
                    type={field.type}
                    key={index}
                    name={fild}
                    value={field.value}
                    onChange={this.onChangeHandler}
                    isValid={field.valid}
                    isTouched={field.touched}
                  />
            )
       });
       
    }

    onChangeHandler = (val, name) => {
        let form = { ...this.state.field};
        let fild = {...form[name]}
        let value = val;
      
        fild.value = value;
        fild.touched = true;
        fild.valid = validationAuth(fild);
        
        form[name] = fild;
        
        this.setState({
            field: form,
            authState: formValidation(form)
        })
    }

    Login = () => {
        let obj = {};
        obj.email = this.state.field.email.value;
        obj.password = this.state.field.password.value;
        obj.returnSecureToken = true;
       
        this.props.login(obj, true);
    }

    Registranion = () => {
        let obj = {};
        let avatar = this.props.userAvatar;
        obj.email = this.state.field.email.value;
        obj.password = this.state.field.password.value;
        obj.returnSecureToken = true;

       this.props.registration(obj, avatar, true);
    }

    uploaderAction = (file) => {
        this.props.addAvatar(file);
    }

    render(){
        
        return (
            <div className='Auth'>
                 <Uploader action={this.uploaderAction} imageUrl={this.props.userAvatar}/>
                 <div className='AuthContent'>
                        {this.renderInput()}
                        
                    <div className='footer'>
                        <Button 
                        cls='secondary'
                        onClick={this.Login}
                        disable={!this.state.authState}
                        >
                            LOGIN
                        </Button>
                        
                        <Button 
                        cls='primary'
                        onClick={this.Registranion}
                        disable={!this.state.authState}
                        >
                            REGISTRATION
                        </Button>
                    </div>
                 </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        userAvatar: state.authReducer.userAvatar
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        login: (obj, redirect) =>{dispatch(login(obj, redirect))},
        registration : (obj, avatar, redirect) => {dispatch(registration(obj, avatar,redirect))},
        addAvatar: (file) => dispatch(addAvatar(file)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);