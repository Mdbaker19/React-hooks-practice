import React from 'react';
import classes from './Input.module.css';

// {type: 'text', id: 'this'} -> the spread in the input element will add this to the input for each property

const Input = React.forwardRef((props, ref) => {

    return <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input} />
    </div>

});

export default Input;