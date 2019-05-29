import React from 'react'
import '../ActiveQuiz/ActiveQuiz.css'
import AnswersList from '../../containers/AnswersList/AnswersList'

const ActiveQuiz = (props) => (
    <div className='ActiveQuiz'>
        <p className='Question'>
          {props.questionImage ? <img src={props.questionImage} alt="avatar"/> : null}
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