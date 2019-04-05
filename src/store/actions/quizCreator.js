import axios from "axios";

import {ADD_QUIZ, CLEAR_QUIZ, DELETE} from './actionTypes'

export function addQuestion(quiz){
    return{
        type: ADD_QUIZ,
        payload: {
            quiz: quiz
        }
    }
}


export function saveQuestion(){
    return (dispatch, getState) => {
        let state = getState().quizCreateReducer
      axios.post('https://react-quiz-e0237.firebaseio.com/quizes.json', state.quiz)
      .then(() => {
        dispatch(toZeroQuiz())
      })
      .catch((error) => console.log(error))
    }
}


export function toZeroQuiz(){
    return{
        type: CLEAR_QUIZ 
    }
}

export function deletQuestion(id){
    return{
        type: DELETE,
        payload: {
            id: id
        }
    }
}