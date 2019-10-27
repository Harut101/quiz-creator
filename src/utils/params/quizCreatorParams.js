export const formParams = () => {
    return {
        questions : {
            label: "Your Question",
            touched: false,
            valid: false,
            validType: "required",
            value: "",
        },
        answer1 : {
            id: 1,
            label: "Answer 1",
            touched: false,
            valid: false,
            validType: "required",
            value: "",
        },
        answer2 : {
            id: 2,
            label: "Answer 2",
            touched: false,
            valid: false,
            validType: "required",
            value: "",
        },
        answer3 : {
            id: 3,
            label: "Answer 3",
            touched: false,
            valid: false,
            validType: "required",
            value: "",
        },
        answer4 : {
            id: 4,
            label: "Answer 4",
            touched: false,
            valid: false,
            validType: "required",
            value: "",
        },
        rightAnswerId: 1,
        count: 5
    }
}

export const cloneState = (object) => {
   let obj = {};
   for(let key in object){
        if(typeof object[key] === 'object'){
            let clone = {...object[key]};
            obj[key] = clone;
        
        } else {
            obj[key] = object[key]
        }
   }
   return {...obj};
}