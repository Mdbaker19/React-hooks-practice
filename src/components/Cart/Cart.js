import { useContext, useState } from "react";

import classes from './Cart.module.css';

import Modal from '../UI/Modal';
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
    const cartCTX = useContext(CartContext);

    const [readyToOrder, setReadyToOrder] = useState(false);

    const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;
    const hasItems = cartCTX.items.length > 0;

    // bound to ensure the id is added to this function
    const cartItemRemoveHandler = id => {
        cartCTX.removeItem(id);
    }

    // bind to preconfigure the argument to this function
    const cartItemAddHandler = item => {
        cartCTX.addItem({...item, amount: 1});
    }

    const readyToOrderHandler = () => {
        setReadyToOrder(true);
    }

    const cancelReadyToOrder = () => {
        setReadyToOrder(false);
    }

    const cartItems = <ul className={classes['cart-items']}>{
        cartCTX.items.map(item => {
        return <CartItem key={item.id}
                         name={item.name}
                         amount={item.amount}
                         price={item.price}
                         onRemove={cartItemRemoveHandler.bind(null, item.id)}
                         onAdd={cartItemAddHandler.bind(null, item)}/>
    })}</ul>;

    return (
        <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
            { readyToOrder && <div>
                <Checkout currentItems={cartCTX.items}/>
                <button onClick={cancelReadyToOrder}>Cancel</button>
            </div> }

            { !readyToOrder && <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
            { hasItems && <button onClick={readyToOrderHandler} className={classes.button}>Order</button>}
            </div> }
    </Modal>
    )
};

export default Cart;