export function formControl(config, validation){
    return{
        ...config,
        ...validation
    }
}


export function optionsCreator(index) {
    return formControl({
        label: `Ответ ${index}`,
        id: index,
        value:''

    }, 
    {
     valid: false, 
     validType: "required",
     touched: false
    }
    )
}