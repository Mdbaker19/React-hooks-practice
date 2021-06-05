import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnIsAnimated, setBtnIsAnimated] = useState(false);
    const cartCTX = useContext(CartContext);
    const { items } = cartCTX;

    const numberOfCartItems = items.reduce( (curr, item) => curr + parseFloat(item.amount), 0);


    const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ""}`;

    useEffect( () => {
        if(items.length === 0) return;

        setBtnIsAnimated(true);

        const animationTimer = setTimeout( () => {
            setBtnIsAnimated(false);
        }, 300);

        return () => {
            clearTimeout(animationTimer);
        }

    }, [items]);

    return <button onClick={props.onClick} className={btnClasses}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>
            Your Cart
        </span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton;