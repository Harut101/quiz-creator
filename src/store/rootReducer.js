import {combineReducers} from 'redux';
import quizList from './reducers/quizList';
import quiz from './reducers/quiz';
import quizCreateReducer from './reducers/quizCreator';
import authReducer from './reducers/auth'


export default combineReducers({
    quizList,
    quiz,
    quizCreateReducer,
    authReducer
})