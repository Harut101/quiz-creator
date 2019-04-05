import createBrowserHistory from 'history/createBrowserHistory'
import { REDIRECT } from '../store/actions/actionTypes'

export const history = createBrowserHistory();


export const redirect = store => next => action => {
    if(action.type === REDIRECT && action.payload.redirect){
        history[action.payload.method](action.payload.url)
    }

    return next(action)
}