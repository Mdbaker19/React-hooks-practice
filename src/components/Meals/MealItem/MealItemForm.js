import { useRef, useState } from "react";
import classes from './MealItemForm.module.css';

import Input from '../../UI/Input';

const MealItemForm = props => {

    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 ||
            enteredNumber < 1 ||
            enteredNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
        // pass this up as more data is needed than what this form can provide, will be cleaner and easier

    }

    return <form onSubmit={submitHandler} className={classes.form}>
        <Input label="Amount"
               ref={amountInputRef}
               input={ {
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                } } />
        <button>+ Add</button>
        { !amountIsValid && <p>Please enter valid amount (1-5 items).</p>}
    </form>

}

export default MealItemForm;