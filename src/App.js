import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'
import {Route, Switch} from 'react-router-dom'
import requireAuthentication from './hoc/isAuth/isAuth'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Layout>
            <Switch>
              <Route path='/quiz-list' component={QuizList} />
              <Route path='/quiz-creator' component={requireAuthentication(QuizCreator)} />
              <Route path='/quiz/:id' component={Quiz} />
              <Route path='/'  component={Auth} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
