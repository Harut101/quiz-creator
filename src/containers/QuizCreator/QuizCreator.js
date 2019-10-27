import React, { useState, useReducer } from 'react';
import '../QuizCreator/QuizCreator.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import Uploader from '../../components/Uploader/Uploader'
import { validation, formValidation } from '../../helpers/validation';
import { addQuestion, deletQuestion, toZeroQuiz } from '../../store/actions/quizCreator';
import { addQuizImage } from '../../store/actions/quizCreator';
import { initialState, quizCreateReducer } from '../../store/reducers/quizCreator';
import { formParams } from '../../utils/params/quizCreatorParams';
import axios from "axios";


 const QuizCreator = () => {
    const [state, dispatch] = useReducer(quizCreateReducer, initialState);
    const [stateForm, setStateForm] = useState(false);
    const [selectedOption, setOption] = useState(1);
    const [form, setForm] = useState(formParams());


   const toZeroState = () => { 
        setForm(formParams());
        setStateForm(false);
        setOption(1);
    }

  const onChange = (id) => {
        let selectedOption = id;
        setForm({...form, rightAnswerId : id})
        setOption(selectedOption)
    }

  const inputOnChange = (val, field) => {
         let fild = form[field]

         fild.value = val;
         fild.valid = validation(fild.value, fild.validType);
         fild.touched = true;
        
         form[field] = fild;

         let stateForm = formValidation(form);

        setForm({...form});
        setStateForm(stateForm);
    
    }

  const  generateQuestion = () =>{
        let id = state.quiz.length + 1;
        let image = state.quizImage || null;
        let obj = {};

        obj.answers = [];
        obj.id = id;
        obj.image = image
        
        for(let key in form){
            if(form[key].id){
                obj.answers.push(form[key]);
            } else{
                if(key === 'questions'){
                    obj[key] = form[key].value;
                }else{
                    obj[key] = form[key]
                }
            }
        }
        
     dispatch(addQuestion(obj));
     toZeroState();
    }


    const saveQuestion = () => {
        axios.post('https://react-quiz-e0237.firebaseio.com/quizes.json', state.quiz)
          .then(() => {
            dispatch(toZeroQuiz())
          })
          .catch((error) => console.log(error))
        
    }

   const removeQuestion = (id) => {
       dispatch(deletQuestion(id));
        
    }

   const uploaderAction = (file) => {
        dispatch(addQuizImage(file));
    }

    const renderInput = () =>{
        return Object.keys(form).map((field, index)=>{
            let fild = form[field];
            
            return(
               <React.Fragment key={index}>
                    {field !== 'rightAnswerId' && field !== 'count'  ?
                        <Input 
                            label={fild.label}
                            key={index}
                            name={field}
                            onChange={inputOnChange}
                            isValid={fild.valid}
                            isTouched={fild.touched}
                            value={fild.value}
                        />
                            : null
                    }
                    {index === 0 ? <hr/> : null}
               </React.Fragment>
            ) 
            
        });
    }

        return(
            <div className='QuizCreator'>
                 <Uploader action={uploaderAction} imageUrl={state.quizImage}/>
                 <div className='QuizCreatorContent'>
                    {renderInput()}
                    
                    <Select
                     options={[1,2,3,4]}
                     label='Correct Answer'
                     onChange={onChange}
                     selectedOption={parseInt(selectedOption)}
                     />
                        
                    <div className='footer'>
                        <Button cls='secondary'
                         onClick={generateQuestion}
                         disable={!stateForm}
                         >
                            Add Question
                        </Button>
                        <Button cls='primary' 
                         onClick={saveQuestion}
                         disable={!state.quiz.length}
                        >
                            Create Test
                        </Button>
                    </div>
                 </div>
                 <div className='list-block'>
                    <h4>Questions List</h4>
                    <ul>
                        {
                            state.quiz.map((quiz, index) => {
                                    return(
                                        <li key={index}>
                                         <i className="Menu fa  fa-times open" onClick={() => removeQuestion(quiz.id)}></i>
                                            {quiz.questions}
                                        </li>
                                    )
                            })
                        }
                    </ul>
                 </div>
            </div>
        )
}

 export default QuizCreator;