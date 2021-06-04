import React from 'react';

import mealImg from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const HeadComponent = (props) => {

    return (
        <React.Fragment>

            <header className={classes.header}>
                <h1>React Meal Order</h1>
                <HeaderCartButton />
            </header>

            <div className={classes['main-image']}>
                <img src={mealImg} alt="Meals on a table" />
            </div>

        </React.Fragment>
    )

};

export default HeadComponent;