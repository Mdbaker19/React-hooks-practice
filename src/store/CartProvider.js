import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === "ADD") {
        const updatedTotalAmount = state.totalAmount + (action.item.price * +action.item.amount);
        const cartItemIndex = state.items.findIndex(item => item.id === action.item.id); // return index or null

        const existingCartItem = state.items[cartItemIndex];
        let updatedItems;
        if(existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: +existingCartItem.amount + +action.item.amount
            };
            updatedItems = [...state.items]; // immutable update, new array
            updatedItems[cartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item); // state should be updated in an immutable way, create a new state object i.e. concat method
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    } else if(action.type === "REMOVE") {

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = +state.totalAmount - +existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1) { // last remaining item in cart
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, amount: +existingItem.amount - 1};
            updatedItems = [...state.items]; // set the items to this value
            updatedItems[existingCartItemIndex] = updatedItem; // updated the specific item at the index we have to the new updated item ( value at -1)
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }

    } else if (action.type === "CLEAR") {
        return defaultCartState;
    }
    return defaultCartState;
}


const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id: id });
    }

    const clearCartHandler = () => {
        dispatchCartAction( { type: "CLEAR" } );
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>

}

export default CartProvider;