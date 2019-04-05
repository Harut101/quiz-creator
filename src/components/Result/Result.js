import React from 'react'
import '../Result/Result.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'


const Result = (props) => {
    let count = 0;
    let answerRes = Object.keys(props.result);
    answerRes.forEach((key)=>{
        if(props.result[key] === 'success'){
            count++;
        }
       
    })


    return(
       <div className='resultBlock'>
       <p>{count} from {props.quiz.length}</p>
         <ul>
             {
                props.quiz.map((question, index)=>{
                    return(
                        <li key={index}>
                            <strong>
                            {question.questions} &nbsp; {props.result[question.id] === 'success'? 
                            <div className='right'></div> : <div className='wrong'></div>}
                            </strong>
                        </li>
                    )
                })
                
             }
         </ul>

         <Button onClick={props.repetGemae}>REPETE</Button>
         <Link to='/quiz-list'>
             <Button cls='primary'>Go To Tests List</Button>
         </Link>
       </div>
    )
}


export default Result;