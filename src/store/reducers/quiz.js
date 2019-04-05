import { START_GET_QUIZ , 
        GET_QUIZ_SUCCESS , 
        GET_QUIZ_FAIL,  
        RIGTH_ANSWER, 
        WRONG_ANSWER, 
        NEXT_QUESTION, 
        REPET_GAME } from '../actions/actionTypes';

const initialState = {
    activeQuestions: 0,
    answerState: null,
    finish: false,
    result: {},
    loading : true,
    quiz: []
}

export default function quizList(state = initialState, action){
    switch(action.type){
        case START_GET_QUIZ :
        return{
            ...state,
            loading: action.payload.loading
        }

        case GET_QUIZ_SUCCESS :
        return{
            ...state,
            quiz:  action.payload.quiz,
            loading: action.payload.loading
        }

        case GET_QUIZ_FAIL :
        return{
            ...state,
            loading: action.payload.loading
        }

        case RIGTH_ANSWER :
        return{
            ...state,
            answerState: action.payload.answerState,
            result: {...state.result, ...action.payload.result},
        }

        case WRONG_ANSWER :
        return{
            ...state,
            answerState: action.payload.answerState,
            result: {...state.result, ...action.payload.result},
        }

        case NEXT_QUESTION :
        return{
            ...state,
             finish: action.payload.finish,
             activeQuestions: state.activeQuestions + action.payload.step,
             answerState: action.payload.answerState
        }

        case REPET_GAME :
        return{
            ...state,
             finish: action.payload.finish,
             activeQuestions:  action.payload.activeQuestions,
             answerState: action.payload.answerState,
             result: action.payload.result
        }

        default: 
        return state
    }

}
