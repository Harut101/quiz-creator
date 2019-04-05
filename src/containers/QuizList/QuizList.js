import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../QuizList/QuizList.css';
import Loading from '../../components/UI/Loading/loading';
import {connect} from 'react-redux';
import {getQuizList, deleteQuizItem} from '../../store/actions/getQuizList'


class QuizList extends Component {

    componentDidMount(){
        this.props.getQuizList();
    }

    delete = (id) => {
       this.props.deleteQuizItem(id);
    }

    renderLinks(){
        return this.props.quizes.map((quiz) => {
            return(
                <li key={quiz.id}>
                <i className="Menu fa  fa-times open" onClick={() => this.delete(quiz.id)}></i>
                   <NavLink to={`/quiz/${quiz.id}`}>
                      {quiz.name}
                   </NavLink>
                </li>
            )
        })
    }


    render() {
        return (
            <div className='QuizList'>
                <div className='QuizListContent'>
                    <h1>Список Тестов</h1>
                    <ul>
                        {this.props.loading ? <Loading/> : this.renderLinks()}
                    </ul>
                </div>
            </div>
        );
    }
}

const maostateToProps = (state) => {
    return{ 
        loading: state.quizList.loading,
        quizes: state.quizList.quizes
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getQuizList: () => dispatch(getQuizList()),
        deleteQuizItem: (id) => dispatch(deleteQuizItem(id))
    }
}

export default connect(maostateToProps, mapDispatchToProps)(QuizList);
