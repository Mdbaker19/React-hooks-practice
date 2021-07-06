import { useState } from "react";

const useInput = (validateFn) => {

    const [value, setValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateFn(value);
    const hasError = !valueIsValid && isTouched;

    const inputChangeHandler = e => {
        setValue(e.target.value);
    }

    const inputBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setIsTouched(false);
        setValue("");
    }

    return {
        value,
        isTouched,
        hasError,
        reset,
        inputChangeHandler,
        inputBlurHandler
    }

}

export default useInput;