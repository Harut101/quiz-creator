import axios from "axios";
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
  return dispatch =>{
        axios.post(LOGIN_URL, data)
        .then(res => {
            let token = res.data.idToken;
            let email = data.email;
            let password = data.password;

            let expiretionTime = res.data.expiresIn;
            let refreshToken = res.data.refreshToken;

            localStorage.setItem('email', email);
            localStorage.setItem('password', password);


            dispatch(loginDispatcher(token, email, password));
            expierListener(expiretionTime, dispatch, refreshToken);
            dispatch(Redirect(redirect));
        })
        .catch(err => {
            console.log(err);
        })
  }
}


export function registration(data, redirect = false){
    return dispatch => {
            axios.post(REGISTRATION_URL, data)
            .then(res => {
                let token = res.data.idToken;
                let email = data.email;
                let password = data.password;

                let expiretionTime = res.data.expiresIn;
                let refreshToken = res.data.refreshToken;

                localStorage.setItem('email', email);
                localStorage.setItem('password', password);

                dispatch(registrationDispatcher(token, email, password));  
                expierListener(expiretionTime, dispatch, refreshToken);
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
       
        let token = res.data.id_token;
        let refreshToken = res.data.refresh_token;
        let expiretionTime = res.data.expires_in;

        dispatch(changeToken(token));
        expierListener(expiretionTime, dispatch, refreshToken);
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