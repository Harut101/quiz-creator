export function validation(value, validation){
   let isValid = false;
    if(validation === 'required'){
        isValid = value.trim()  !== ''
    }
    
    return isValid;
}



export function validationAuth(fild){
    let isValid = false;

    if(fild.type === 'email' && fild.touched){
        isValid =  fild.validation.validationMethod.test(fild.value);   
    }

    if(fild.type === 'password' && fild.touched){
        isValid =  fild.value.length >= fild.validation.validationMethod;
    }
    
    return isValid;
}


export function formValidation(form){
    let formState = false;
    let stateArray = [];

    for(let item in form){
       if(form[item].valid !== undefined && item !== 'rightId' && form[item].touched){
           stateArray.push(form[item].valid);
       }
    }
   
    if(stateArray.length === 5 || stateArray.length === 2){
        let exit = false;
        
        for(let i = 0; i < stateArray.length; i++) {
            if(exit) break;

            if(!stateArray[i]) {
                formState = false;
                exit = true;
            } else {
                formState = true;
            }

        }
    }

    return formState;
}