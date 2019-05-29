import axios from 'axios';
import { ADD_AVATAR, ADD_USER } from '../store/actions/actionTypes'

export function userDataCare(email, password, avatar){
    axios.post('https://react-quiz-e0237.firebaseio.com/users.json', {email, password, avatar})
}


export function getUsers(){
    return dispatch => {
        axios.get('https://react-quiz-e0237.firebaseio.com/users.json')
        .then(response =>{
            dispatch(addUsers(response.data));
        })    
    }

}


export function setUserAvatar(email, users, dispatch){
    if(users){
        for(let key in users){
            if(email === users[key].email){
                dispatch(addAvatar(users[key].avatar));
            }
        }
    } else {
        axios.get('https://react-quiz-e0237.firebaseio.com/users.json')
        .then(response =>{
            let users = response.data;
            for(let key in users){
                if(email === users[key].email){
                    dispatch(addAvatar(users[key].avatar));
                }
            }
        })    
    }
}


export function addAvatar(file) {
    return {
        type : ADD_AVATAR,
        payload: {
            file: file
        }
    }
}


export function addUsers(users) {
    return {
        type : ADD_USER,
        payload: {
            users: users
        }
    }
}
