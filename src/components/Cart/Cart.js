import React, { useContext, useState } from "react";

import classes from './Cart.module.css';

import Modal from '../UI/Modal';
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCTX = useContext(CartContext);

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

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const cancelCheckout = () => {
        setIsCheckout(false);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch("https://react-hooks-example-db-b2259-default-rtdb.firebaseio.com/orders.json", {
           method: "POST",
           body: JSON.stringify({
               user: userData,
               orderedItems: cartCTX.items
           })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCTX.clearCart();
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

    const modalActions = <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
        { hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
                        </div>

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        { isCheckout && <Checkout onComfirm={submitOrderHandler} onCancel={cancelCheckout}/> }
        { !isCheckout &&  modalActions }
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending Order..</p>

    const didSubmitModalContent = <React.Fragment>
        <p>Successfully Sent. Order is in preparation</p>
        <button className={classes.button} onClick={props.onClose}>Close</button>
    </React.Fragment>

    return (
        <Modal onClose={props.onClose}>
            { !isSubmitting && !didSubmit && cartModalContent }
            { isSubmitting && isSubmittingModalContent }
            { !isSubmitting && didSubmit && didSubmitModalContent }
        </Modal>
    )
}

export default Cart;