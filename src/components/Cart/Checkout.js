import useInput from "../../hooks/use-input";

const validateInput = (inputStr) => {
    return inputStr.trim() !== "";
}

const createOrderString = (order) => {
    let output = "";
    for(const o in order) {
        output += order[o].amount + " " + order[o].name + ", ";
    }
    return output.substring(0, output.length - 2);
}

const Checkout = (props) => {

    const {
        value: nameInputValue,
        hasError: nameInputHasError,
        isTouched: nameInputIsTouched,
        inputBlurHandler: nameInputBlurHandler,
        inputChangeHandler: nameInputChangeHandler,
        reset: resetName
    } = useInput(validateInput);

    const {
        value: cityInputValue,
        hasError: cityInputHasError,
        isTouched: cityInputIsTouched,
        inputBlurHandler: cityInputBlurHandler,
        inputChangeHandler: cityInputChangeHandler,
        reset: resetCity
    } = useInput(validateInput);

    const {
        value: streetInputValue,
        hasError: streetInputHasError,
        isTouched: streetInputIsTouched,
        inputBlurHandler: streetInputBlurHandler,
        inputChangeHandler: streetInputChangeHandler,
        reset: resetStreet
    } = useInput(validateInput);

    const {
        value: zipInputValue,
        hasError: zipInputHasError,
        isTouched: zipInputIsTouched,
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
        const res = await fetch("https://react-hooks-example-db-b2259-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            body: JSON.stringify(orderData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(orderData);
    }

    return <>
        <form onSubmit={postFormData}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={nameInputValue}
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input
                    id="city"
                    type="text"
                    value={cityInputValue}
                    onChange={cityInputChangeHandler}
                    onBlur={cityInputBlurHandler}
                />
            </div>
            <div>
                <label htmlFor="street">Street</label>
                <input
                    id="street"
                    type="text"
                    value={streetInputValue}
                    onChange={streetInputChangeHandler}
                    onBlur={streetInputBlurHandler}
                />
            </div>
            <div>
                <label htmlFor="zipcode">Zip Code</label>
                <input
                    id="zipcode"
                    type="text"
                    value={zipInputValue}
                    onChange={zipInputChangeHandler}
                    onBlur={zipInputBlurHandler}
                />
            </div>
            <button>Confirm</button>
        </form>
    </>

}

export default Checkout;