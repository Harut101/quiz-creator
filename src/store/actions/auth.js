import axios from "axios";
import { userDataCare, setUserAvatar } from '../../helpers/userDataCare';
import {LOGIN, 
        REGISTRATION, 
        LOGOUT, 
        LOGIN_URL, 
        REGISTRATION_URL, 
        EXCHANGE_TOKEN_URL,
        CHANGE_TOKEN,
        REDIRECT
        } from '../../store/actions/actionTypes';


export function login(data, redirect = false){
  return (dispatch, getState) =>{
        axios.post(LOGIN_URL, data)
        .then(res => {
            let {idToken, expiresIn, refreshToken} =  res.data;
            let {email, password} = data;

            let users = getState().usersDataReducer.users;

            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            setUserAvatar(email, users, dispatch);
            dispatch(loginDispatcher(idToken, email, password));
            expierListener(expiresIn, dispatch, refreshToken);
            dispatch(Redirect(redirect));
        })
        .catch(err => {
            console.log(err);
        })
  }
}


export function registration(data, avatar, redirect = false){
    debugger;
    return dispatch => {
            axios.post(REGISTRATION_URL, data)
            .then(res => {
               let {idToken, expiresIn, refreshToken} =  res.data;
               let {email, password} = data;

                localStorage.setItem('email', email);
                localStorage.setItem('password', password);

                dispatch(registrationDispatcher(idToken, email, password));  
                userDataCare(email, password, avatar);
                expierListener(expiresIn, dispatch, refreshToken);
                dispatch(Redirect(redirect));
            })
            .catch(err => {
                console.log(err);
                
            })
    }
}

function expierListener(time, dispatch, refreshToken){
       let expireDate =  new Date(new Date().getTime() + parseInt(time) * 1000);
       let timer = setTimeout(() => {
            if(new Date() <= expireDate){
                autologin(dispatch, refreshToken)
            }
            clearTimeout(timer)
        }, parseInt(time) * 1000)
        
}

function autologin(dispatch, refreshToken){
    let data = {
        grant_type : 'refresh_token',
        refresh_token: refreshToken
    }

    axios.post(EXCHANGE_TOKEN_URL, data)
    .then(res => {
        let {id_token, expires_in, refresh_token} =  res.data;

        dispatch(changeToken(id_token));
        expierListener(expires_in, dispatch, refresh_token);
    })
    .catch(err => {
        console.log(err);
     })

}


 function loginDispatcher(token, email, password) {
    return {
        type : LOGIN,
        payload : {
          token : token,
          email: email, 
          password: password,
          isLoginUser: true
        }
    }
}


 function registrationDispatcher(token, email, password) {
    return {
        type : REGISTRATION,
        payload : {
            token : token,
            email: email, 
            password: password,
            isLoginUser: true
        }
    }
}

function changeToken(token) {
    return {
        type : CHANGE_TOKEN,
        payload: {
            token: token
        }
    }
}


export function logOut() {
    return {
        type : LOGOUT
    }
}

function Redirect(redirect) {
    return {
        type : REDIRECT,
        payload: {
          method: 'push',
          url: '/quiz-creator',
          redirect: redirect
        }
    }
}