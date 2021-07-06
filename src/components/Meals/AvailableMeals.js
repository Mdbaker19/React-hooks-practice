import { useEffect, useState} from "react";

import classes from './AvailableMeals.module.css';

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect( () => {
        const fetchMeals = async () => {
            setError(null);
            setIsLoading(true);
            const res = await fetch("https://react-hooks-example-db-b2259-default-rtdb.firebaseio.com/meals.json", {});

            if (!res.ok) {
                throw new Error("Seems to be an issue pulling data");
            }

            const data = await res.json();

            let mealList = [];

            for (let m in data) {
                mealList.push({
                    id: m,
                    name: data[m].name,
                    description: data[m].description,
                    price: data[m].price,
                });
            }

            setMeals(mealList);
            setIsLoading(false);
        };

        fetchMeals().then().catch(err => {
            setIsLoading(false);
            setError(err);
        });
    }, []);

    const mealsList = isLoading ? <p>Loading...</p> : meals.map(meal => {
        return <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price} />
    });

    return (
        <section className={classes.meals}>
            {error ? <p>{error}</p> :
                <Card>
                    <ul>
                        {mealsList}
                    </ul>
                </Card>
            }
        </section>
    )

}

export default AvailableMeals;