import './App.css';

import HeadComponent from "./components/Layout/HeadComponent";
import React from "react";
import Meals from "./components/Meals/Meals";

function App() {
  return (
      <React.Fragment>
        <HeadComponent />
          <main>
              <Meals />
          </main>
      </React.Fragment>
  );
}

export default App;
