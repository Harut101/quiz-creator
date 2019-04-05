import {LOGIN, REGISTRATION, LOGOUT, CHANGE_TOKEN} from '../../store/actions/actionTypes';

const initialState = {
    token : null,
    userEmail: null,
    userPassword: null,
    isLoginUser: false 
}


export default function authReducer(state = initialState, action){
    switch(action.type){
        case LOGIN:
        return {
            token : action.payload.token,
            userEmail: action.payload.email,
            userPassword: action.payload.password,
            isLoginUser: action.payload.isLoginUser
        }
        case REGISTRATION:
        return {
            token : action.payload.token,
            userEmail: action.payload.email,
            userPassword: action.payload.password,
            isLoginUser: action.payload.isLoginUser
        }
        case LOGOUT:
        return {
            token : null,
            userEmail: null,
            userPassword: null,
            isLoginUser: false 
        }
        case CHANGE_TOKEN:
        return {
            ...state,
            token: action.payload.token,
        }
        default:
        return state
    }

}