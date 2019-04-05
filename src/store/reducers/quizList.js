import { START_GET_QUIZES , GET_QUIZES_SUCCESS , GET_QUIZES_FAIL } from '../actions/actionTypes'
const initialState = {
    loading: true,
    quizes: []
}

export default function quizList(state = initialState, action){
    switch(action.type){
        case START_GET_QUIZES :
        return{
            ...state,
            loading: action.payload.loading
        }

        case GET_QUIZES_SUCCESS :
        return{
            quizes:  action.payload.quizes,
            loading: action.payload.loading
        }

        case GET_QUIZES_FAIL :
        return{
            ...state,
            loading: action.payload.loading
        }

        default: 
        return state
    }

}
