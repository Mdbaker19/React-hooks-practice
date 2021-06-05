import React from 'react';

// to give better IDE autocomplete
const CartContext = React.createContext( {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
} );

export default CartContext;