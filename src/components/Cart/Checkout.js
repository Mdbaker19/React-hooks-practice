import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const validateInput = (inputStr) => {
    return inputStr.trim() !== "";
}

const getClasses = (errorStatus) => {
    return errorStatus ? `${classes.control} ${classes.invalid}` : classes.control;
}

const createOrderString = (order) => {
    let output = [];
    for(const o in order) {
        let currOrder = order[o].amount + " " + order[o].name;
        output.push(currOrder);
    }
    return output;
}

const Checkout = (props) => {

    const {
        value: nameInputValue,
        hasError: nameInputHasError,
        inputBlurHandler: nameInputBlurHandler,
        inputChangeHandler: nameInputChangeHandler,
        reset: resetName
    } = useInput(validateInput);

    const {
        value: cityInputValue,
        hasError: cityInputHasError,
        inputBlurHandler: cityInputBlurHandler,
        inputChangeHandler: cityInputChangeHandler,
        reset: resetCity
    } = useInput(validateInput);

    const {
        value: streetInputValue,
        hasError: streetInputHasError,
        inputBlurHandler: streetInputBlurHandler,
        inputChangeHandler: streetInputChangeHandler,
        reset: resetStreet
    } = useInput(validateInput);

    const {
        value: zipInputValue,
        hasError: zipInputHasError,
        inputBlurHandler: zipInputBlurHandler,
        inputChangeHandler: zipInputChangeHandler,
        reset: resetZip
    } = useInput(validateInput);

    const postFormData = async (e) => {
        e.preventDefault();
        const orderData = {
            order: createOrderString(props.currentItems),
            name: nameInputValue,
            city: cityInputValue,
            street: streetInputValue,
            zipcode: zipInputValue
        }
        await fetch("https://react-hooks-example-db-b2259-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            body: JSON.stringify(orderData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        resetStreet();
        resetCity();
        resetName();
        resetZip();
        props.orderSent();
    }

    return <>
        <form onSubmit={postFormData} className={classes.form}>
            <div className={getClasses(nameInputHasError)}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={nameInputValue}
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                />
            </div>
            <div className={getClasses(cityInputHasError)}>
                <label htmlFor="city">City</label>
                <input
                    id="city"
                    type="text"
                    value={cityInputValue}
                    onChange={cityInputChangeHandler}
                    onBlur={cityInputBlurHandler}
                />
            </div>
            <div className={getClasses(streetInputHasError)}>
                <label htmlFor="street">Street</label>
                <input
                    id="street"
                    type="text"
                    value={streetInputValue}
                    onChange={streetInputChangeHandler}
                    onBlur={streetInputBlurHandler}
                />
            </div>
            <div className={getClasses(zipInputHasError)}>
                <label htmlFor="zipcode">Zip Code</label>
                <input
                    id="zipcode"
                    type="text"
                    value={zipInputValue}
                    onChange={zipInputChangeHandler}
                    onBlur={zipInputBlurHandler}
                />
            </div>
            <div className={classes.actions}>
                <button>Confirm</button>
                <button onClick={props.cancel}>Cancel</button>
            </div>
        </form>
    </>

}

export default Checkout;