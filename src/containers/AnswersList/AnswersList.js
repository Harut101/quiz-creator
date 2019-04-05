import React from 'react';
import '../AnswersList/AnswersList.css';
import { PENDING } from '../../store/actions/getQuiz'

const AnswersList = (props) =>{
    let cls = '';
    if(props.state !== null){
        cls = props.state;
        
    }

    return(
        <ul className='AnswersList'>
            {props.answers.map((answer, index)=>{ 
                return(
                    <li 
                    onClick={() => { if(!PENDING) props.onAnswerClick(answer.id, props.rightAnswerId) }} 
                    className={`AnswerItem ${cls[answer.id]}`} key={index}>
                     {answer.value}
                    </li>
                ) 
            })}
        </ul>

    )

}



export default AnswersList;