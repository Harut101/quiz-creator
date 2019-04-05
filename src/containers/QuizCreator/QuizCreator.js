import React, { Component } from 'react';
import '../QuizCreator/QuizCreator.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {formControl, optionsCreator} from '../../helpers/formHelper';
import {validation, formValidation} from '../../helpers/validation';
import {connect} from 'react-redux';
import {addQuestion, saveQuestion, deletQuestion} from '../../store/actions/quizCreator';


class QuizCreator extends Component{

    state = {
        stateForm: false,
        form: {
            questions: formControl({label: 'Your Question', value:''}, {valid: false, validType: "required", touched: false}),
            rightAnswerId: 1,
            option1: optionsCreator(1),
            option2: optionsCreator(2),
            option3: optionsCreator(3),
            option4: optionsCreator(4),
        },
        selectedOption: 1
    }

    toZeroState = () => {
        let form = {...this.state.form};
        let selectedOption = {...this.state.selectedOption};
        let stateForm = {...this.state.stateForm};

        let newForm =  {
            questions: formControl({label: 'Ваш Вопрос', value:''}, 
            {valid: false, validType: "required", touched: false}),
            rightAnswerId: 1,
            option1: optionsCreator(1),
            option2: optionsCreator(2),
            option3: optionsCreator(3),
            option4: optionsCreator(4),
        }

        form = newForm;
        selectedOption = 1;
        stateForm = false;

        this.setState({
            form,
            selectedOption,
            stateForm
        })
    }

    renderInput(){
        return Object.keys(this.state.form).map((field, index)=>{
            let fild = this.state.form[field];

            return(
               <React.Fragment key={index}>
                    {field !== 'rightAnswerId' ?
                    <Input 
                        label={fild.label}
                        key={index}
                        name={field}
                        onChange={this.inputOnChange}
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

    onChange = (id) => {
        let form = {...this.state.form};
        let selectedOption = {...this.state.selectedOption}

        form['rightAnswerId'] = id;
        selectedOption = id;

        this.setState({
           form,
           selectedOption
        })
    }

    inputOnChange = (val, field) =>{
        let form = {...this.state.form};
        let fild = {...form[field]}

        fild.value = val;
        fild.valid = validation(fild.value, fild.validType);
        fild.touched = true;
        
        form[field] = fild;
        
        this.setState({
            form,
            stateForm: formValidation(form)
        })
    
    }

    generateQuestion = () =>{
        let form = this.state.form;
        let id = this.props.quiz.length + 1;
        
        let obj = {};
        obj.answers = [];
        obj.id = id;

        for(let key in form){
            if(form[key].id){
                obj.answers.push(form[key]);
            }else{
                if(key === 'questions'){
                    obj[key] = form[key].value;
                }else{
                    obj[key] = form[key]
                }
            }
        }
        
      this.props.addQuestion(obj);
      this.toZeroState()
    }

    createQuiz = () =>{
        this.props.saveQuestion();
    }

    delete = (id) => {
       this.props.deletQuestion(id);
        
    }

    render(){

        return(
            <div className='QuizCreator'>
                 <div className='QuizCreatorContent'>
                    {this.renderInput()}
                    
                    <Select
                     options={[1,2,3,4]}
                     label='Correct Answer'
                     onChange={this.onChange}
                     selectedOption={parseInt(this.state.selectedOption)}
                     />
                        
                    <div className='footer'>
                        <Button cls='secondary'
                         onClick={this.generateQuestion}
                         disable={!this.state.stateForm}
                         >
                            Add Question
                        </Button>
                        <Button cls='primary' 
                         onClick={this.createQuiz}
                         disable={!this.props.quiz.length}
                        >
                            Create Test
                        </Button>
                    </div>
                 </div>
                 <div className='list-block'>
                    <h4>Questions List</h4>
                    <ul>
                        {
                            this.props.quiz.map((quiz, index) => {
                                    return(
                                        <li key={index}>
                                         <i className="Menu fa  fa-times open" onClick={() => this.delete(quiz.id)}></i>
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
}

const mapStateToProps = (state) => {
 return {
     quiz: state.quizCreateReducer.quiz
 }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addQuestion: (obj) => dispatch(addQuestion(obj)),
        saveQuestion: () => dispatch(saveQuestion()),
        deletQuestion: (id) => dispatch(deletQuestion(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);