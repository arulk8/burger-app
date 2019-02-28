import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './burgerIngredients/BurgerIngredient';
const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)

    .map(key => {
      let count = props.ingredients[key];

      let arr = [...Array(count)].map((_, i) => i);
      return arr.map(i => <BurgerIngredient key={key + i} type={key} />);
    })
    .reduce((arr, current) => {
      return arr.concat(current);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p> Please start adding ingredients! </p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
