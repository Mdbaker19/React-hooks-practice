import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {

    const cartCTX = useContext(CartContext);

    const numberOfCartItems = cartCTX.items.reduce( (curr, item) => curr + parseFloat(item.amount), 0);

    return <button onClick={props.onClick} className={classes.button}>
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