import React, { useState, useEffect } from 'react';
import './input.scss';
export const Input = (props) => {
    const { type, options, label, valid, errorMsg } = props;
    const [isInputValid, setInputValid ] = useState(true);

    useEffect(()=>{
        setInputValid(valid);
    }, [valid])

    const inputChangeHandler = (e) => {
        
        setInputValid(true);
    }

    const getInput = () => {
        switch(type) {
            case 'checkbox':
            case 'radio' : if(options && options.length) {
                return (
                        <>
                            {
                                options.map((o) => (
                                    <div className="radio-type-block" key={o.key}>
                                        <input {...props} value={o.value}  onChange={inputChangeHandler}/> 
                                        <label>{o.key}</label>
                                    </div>
                                ))
                            }
                            
                        </>
                    )
                } 
                break;
            default: return <input {...props} onChange={inputChangeHandler} />
        }
    }

    return (
        <div className="input-container">
            <label>{label}</label>
            {
                getInput()
            }
            {!isInputValid ? <div className="error">{errorMsg}</div> : null }
        </div>
    )
}