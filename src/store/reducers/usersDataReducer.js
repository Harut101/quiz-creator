import { ADD_USER } from '../../store/actions/actionTypes';

const initialState = {
    users: null
}

export default function quizList(state = initialState, action){
    switch(action.type){
        case ADD_USER :
        return{
            users: action.payload.users
        }

        default: 
        return state
    }

}
