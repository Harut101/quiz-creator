import React from 'react'
import '../ActiveQuiz/ActiveQuiz.css'
import AnswersList from '../../containers/AnswersList/AnswersList'

const ActiveQuiz = (props) => (
    <div className='ActiveQuiz'>
        <p className='Question'>
            <span>
                <strong>&nbsp;
                {props.questions}
                </strong>
            </span>
            <small>{props.activeQuestions + 1} from {props.allQuestions}</small>
        </p>


        <AnswersList 
            answers={props.answers}
            questions={props.question}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
            rightAnswerId={props.rightAnswerId}
        />
    </div>
)

export default ActiveQuiz;