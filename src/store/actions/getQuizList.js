import axios from 'axios';
import { START_GET_QUIZES , GET_QUIZES_SUCCESS , GET_QUIZES_FAIL } from './actionTypes'

export function getQuizList(){
    return dispatch =>{
        dispatch(getQuizesStart())
        axios.get('https://react-quiz-e0237.firebaseio.com/quizes.json')
        .then(response =>{
          let quizes = [];
          Object.keys(response.data).forEach((key, index) => {
             quizes.push({
                 id: key,
                 name:  `Test №${index + 1}`
             })
          });

          dispatch(getQuizesSuccess(quizes))
         
        })
        .catch(error =>{
            dispatch(getQuizesFail(error))
        })
    }
}

export function deleteQuizItem(id){
    return dispatch =>{
        dispatch(getQuizesStart())
        axios.delete(`https://react-quiz-e0237.firebaseio.com/quizes/${id}.json`)
        .then(() =>{
            
            axios.get('https://react-quiz-e0237.firebaseio.com/quizes.json')
            .then(response =>{
              let quizes = [];
              Object.keys(response.data).forEach((key, index) => {
                 quizes.push({
                     id: key,
                     name:  `Test №${index + 1}`
                 })
              });
    
              dispatch(getQuizesSuccess(quizes))
            })
         
        })
        .catch(error =>{  
            dispatch(getQuizesFail(error))
        })
    }
}

export function getQuizesStart(){
    return {
        type: START_GET_QUIZES,
        payload: {
            loading: true
        }
    }
}

export function getQuizesSuccess(quizes){
    return {
        type: GET_QUIZES_SUCCESS,
        payload: {
            loading: false,
            quizes: quizes
        }
    }
}

export function getQuizesFail(error){
    return {
        type: GET_QUIZES_FAIL,
        payload: {
            loading: false,
            error: error
        }
    }
}