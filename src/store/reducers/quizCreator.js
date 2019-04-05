import {ADD_QUIZ, CLEAR_QUIZ, DELETE} from '../actions/actionTypes'

const initialState = {
    quiz: []
}

export default function quizCreateReducer(state = initialState, action){
    switch(action.type){
        case ADD_QUIZ :
        return{
            quiz: [...state.quiz, action.payload.quiz]
        }

        case DELETE :
        return{
            quiz: state.quiz.filter(quiz => quiz.id !== action.payload.id)
        }

        case CLEAR_QUIZ :
        return{
            quiz: []
        }

        default: 
        return state
    }
}