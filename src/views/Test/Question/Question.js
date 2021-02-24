import React from 'react';
import './Question.css';
import CardHeader from '../../../components/Card/CardHeader';

const Question = (props) => {
    return (
        <>            
            {props.question}
        </>
    );
}

export default Question;