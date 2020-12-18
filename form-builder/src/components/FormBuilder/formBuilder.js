import React, { useState } from 'react';
import templates from '../../configs/form-config.json';
import { Form } from '../Form/form';
import './formBuilder.scss'

export const FormBuilder = () => {

    const [selectedTemplate, setSelectedTemplate] = useState();

    const templateChangeHandler = (e) => {
        const { value } = e.target;
        if(value) {
            setSelectedTemplate(templates[value]);
        }
         
    }

    return (
        <div className="main-container">
            <select onChange={templateChangeHandler}>
                <option value="">Select one Template</option>
                {
                    templates && Object.keys(templates).map( t => <option key={t} value={t}>{t}</option>)
                }
            </select>
            <Form template={selectedTemplate}></Form>
        </div>
    )
}