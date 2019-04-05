import React, {Component} from 'react';
import '../Quiz/Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import Result from '../../components/Result/Result';
import Loading from '../../components/UI/Loading/loading';
import { connect } from 'react-redux';
import { getQuiz, onAnswerClick, repetGemae } from '../../store/actions/getQuiz'

class Quiz extends Component{

    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getQuiz(id);
    }
    
    componentWillUnmount(){
        this.props.repetGemae()
    }
    
    render(){
        
        return(
            <div className='Quiz'>
                <div className="QuizWrapper">
                <h1>QUIZ</h1>
                { this.props.loading 
                
                 ?
                  <Loading/>
                 : 
                    this.props.finish 
                   ?
                        <Result 
                            quiz={this.props.quiz}
                            result={this.props.result}
                            repetGemae={this.props.repetGemae}
                        /> 
                   :
                        <ActiveQuiz 
                            answers={this.props.quiz[this.props.activeQuestions].answers}
                            questions={this.props.quiz[this.props.activeQuestions].questions}
                            onAnswerClick={this.props.onAnswerClick}
                            allQuestions={this.props.quiz.length}
                            activeQuestions={this.props.activeQuestions}
                            state={this.props.answerState}
                            rightAnswerId={this.props.quiz[this.props.activeQuestions].rightAnswerId}
                        />
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeQuestions: state.quiz.activeQuestions,
        answerState: state.quiz.answerState,
        finish: state.quiz.finish,
        result: state.quiz.result,
        loading : state.quiz.loading,
        quiz: state.quiz.quiz
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getQuiz: (id) => dispatch(getQuiz(id)),
        onAnswerClick: (id, rightAnswerId) => dispatch(onAnswerClick(id, rightAnswerId)),
        repetGemae: () => dispatch(repetGemae())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);