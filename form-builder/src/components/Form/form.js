import React, { useState, useEffect } from 'react';
import { Input } from '../Input/input';
import { validations } from '../../utils/validations';

import './form.scss';

export const Form = (props) => {

    const { template } = props;

    const [formTemplate, setFormTemplate] = useState([]);

    useEffect(()=>{
        setFormTemplate(template);
    }, [template])
    
    const checkValidation = (data) => {
        const _formTemplate = [...formTemplate];
        let isFormValid = true;
        _formTemplate.forEach( input => {
            const val = data[input.name];
            input.valid = true;
            input.errorMsg = '';
            if(input.validations) {
                input.validations.forEach((validation) => {
                    let isValid;
                    switch(validation.name) {
                        case 'require': isValid = validations.require(val);
                            break;
                        case 'minLength': isValid = validations.minLength(val, validation.length);
                            break;
                        case 'pattern': isValid = validations.pattern(val, validation.pattern);
                            break;
                    }
                    if(!isValid) {
                        input.valid = false;
                        input.errorMsg = validation.errorMsg;
                    }
                })
            }
            if(!input.valid) {
                isFormValid = false;
            }
        });
        setFormTemplate(_formTemplate);

        return isFormValid;
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        let data = {};
        if(formTemplate) {
            formTemplate.forEach( input => {
                if(input.name ) {
                    data[input.name] = event.target.elements[input.name] && event.target.elements[input.name].value;
                }
            });

            const isValid = checkValidation(data);

            if(isValid) {
                console.log(data);
                fetch('/url', {method: 'POST'}).then((res) => {
                    res.json();
                })
                .then((result) => {
                    console.log(result);
                })
            }
        }
    }

    return (
        <div className="form-container" >
            <form  onSubmit={onFormSubmit}>
                {
                    formTemplate && formTemplate.map((input) => (
                        input.type === 'submit' ? 
                            <Input key="submit" {...input}></Input>
                            :
                            <Input key={input.name} {...input}></Input>
                        
                    ))
                }
            </form>
        </div>
    )
}