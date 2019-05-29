import {combineReducers} from 'redux';
import quizList from './reducers/quizList';
import quiz from './reducers/quiz';
import quizCreateReducer from './reducers/quizCreator';
import authReducer from './reducers/auth';
import usersDataReducer from './reducers/usersDataReducer'


export default combineReducers({
    quizList,
    quiz,
    quizCreateReducer,
    authReducer,
    usersDataReducer
})