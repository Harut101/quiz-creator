import axios from 'axios';
import { START_GET_QUIZ , 
         GET_QUIZ_SUCCESS , 
         GET_QUIZ_FAIL, 
         RIGTH_ANSWER, 
         WRONG_ANSWER, 
         NEXT_QUESTION, 
         REPET_GAME } from './actionTypes';

export let PENDING = false;

export function getQuiz(id){
    return dispatch =>{
        dispatch(getQuizStart())
        axios.get(`https://react-quiz-e0237.firebaseio.com/quizes/${id}.json`)
        .then(response =>{
           let quiz = response.data;
           
           dispatch(getQuizSuccess(quiz))
        })
        .catch(error =>{
            dispatch(getQuizFail(error))
        })
    }
}


export function onAnswerClick(id, rightAnswerId){
    
    return (dispatch, getState) => {
        PENDING = true;
        let state =  getState().quiz;
        let questionId = state.quiz[state.activeQuestions].id;

        if(id === parseInt(rightAnswerId)){
            dispatch(RightAnswer(id, questionId));
            if(state.quiz.length === state.activeQuestions + 1){
                setTimeout(() => {
                    dispatch(next(0, true));
                    PENDING = false;
                },1000)
            }else{
                setTimeout(() => {
                    dispatch(next(1, false));
                    PENDING = false;
                },1000)
            }
        }else{
            dispatch(WrongtAnswer(id, questionId));
            if(state.quiz.length === state.activeQuestions + 1){
                setTimeout(() => {
                    dispatch(next(0, true));
                    PENDING = false;
                },1000)
            }else{
                setTimeout(() => {
                    dispatch(next(1, false));
                     PENDING = false;
                },1000)
            }
        }
       
    }
}

export function getQuizStart(){
    return {
        type: START_GET_QUIZ,
        payload: {
            loading: true
        }
    }
}

export function getQuizSuccess(quiz){
    return {
        type: GET_QUIZ_SUCCESS,
        payload: {
            loading: false,
            quiz: quiz
        }
    }
}

export function getQuizFail(error){
    return {
        type: GET_QUIZ_FAIL,
        payload: {
            loading: false, 
            error: error
        }
    }
}


export function RightAnswer(id, questionId){
    return {
        type : RIGTH_ANSWER,
        payload: {
            answerState: {[id]: 'success'},
            result: {[questionId]: 'success'},
           
        }
    }
}


export function WrongtAnswer(id, questionId){
    return {
        type : WRONG_ANSWER,
        payload: {
            answerState: {[id]: 'error'},
            result: {[questionId]: 'error'},
        }
    }
}


export function next(step, finish){
    return {
        type : NEXT_QUESTION,
        payload: {
           step: step,
           finish: finish,
           answerState: null,
        }
    }
}

export function repetGemae(){
    return{
        type: REPET_GAME,
        payload:{
            activeQuestions: 0,
            answerState: null,
            finish: false,
            result: {},
        }
    }
}