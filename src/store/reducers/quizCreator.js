import {ADD_QUIZ, CLEAR_QUIZ, DELETE, ADD_QUIZ_IMAGE} from '../actions/actionTypes'

const initialState = {
    quiz: [],
    quizImage: null
}

export default function quizCreateReducer(state = initialState, action){
    switch(action.type){
        case ADD_QUIZ :
        return{
            quiz: [...state.quiz, action.payload.quiz]
        }

        case ADD_QUIZ_IMAGE :
        return{
            quiz: [...state.quiz],
            quizImage:  action.payload.quizImage
        }

        case DELETE :
        return{
            quiz: state.quiz.filter(quiz => quiz.id !== action.payload.id)
        }

        case CLEAR_QUIZ :
        return{
            quiz: [],
            quizImage: null
        }

        default: 
        return state
    }
}