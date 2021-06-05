import './App.css';

import React, { useState } from "react";
import HeadComponent from "./components/Layout/HeadComponent";
import Meals from "./components/Meals/Meals";
import Cart from './components/Cart/Cart';
import CartProvider from "./store/CartProvider";

function App() {

    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

  return (
      <CartProvider>
          { cartIsShown && <Cart onClose={hideCartHandler}/>}
        <HeadComponent onShowCart={showCartHandler} />
          <main>
              <Meals />
          </main>
      </CartProvider>
  );
}

export default App;
