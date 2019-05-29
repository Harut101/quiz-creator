import {LOGIN, REGISTRATION, LOGOUT, CHANGE_TOKEN, ADD_AVATAR} from '../../store/actions/actionTypes';

const initialState = {
    token : null,
    userEmail: null,
    userPassword: null,
    isLoginUser: false,
    userAvatar: null
}


export default function authReducer(state = initialState, action){
    switch(action.type){
        case LOGIN:
        return {
            ...state,
            token : action.payload.token,
            userEmail: action.payload.email,
            userPassword: action.payload.password,
            isLoginUser: action.payload.isLoginUser
        }
        case REGISTRATION:
        return {
            ...state,
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
            isLoginUser: false,
            userAvatar: null
        }
        case CHANGE_TOKEN:
        return {
            ...state,
            token: action.payload.token,
        }
        case ADD_AVATAR:
        return {
            ...state,
            userAvatar: action.payload.file,
        }
        default:
        return state
    }

}