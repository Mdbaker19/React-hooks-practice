import { useRef, useState } from "react";
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFive = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        zip: true
    });

    const nameRef = useRef();
    const streetRef = useRef();
    const zipRef = useRef();
    const cityRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredZip = zipRef.current.value;
        const enteredCity = cityRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredZipIsValid = isFive(enteredZip);

        setFormInputValidity( {
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            zip: enteredZipIsValid
        });

        const formIsValid = enteredNameIsValid && enteredStreetIsValid &&
                            enteredCityIsValid && enteredZipIsValid;

        if(!formIsValid) {
            return;
        }

        props.onComfirm({
            name: enteredName,
            city: enteredCity,
            street: enteredStreet,
            zip: enteredZip
        });



    };

    const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;
    const zipControlClasses = `${classes.control} ${formInputValidity.zip ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef}/>
                {!formInputValidity.name && <p>Enter a valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetRef}/>
                {!formInputValidity.street && <p>Enter a valid street</p>}
            </div>
            <div className={zipControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={zipRef}/>
                {!formInputValidity.zip && <p>Enter a valid zip</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef}/>
                {!formInputValidity.city && <p>Enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;