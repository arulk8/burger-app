import React from 'react';
import classes from './Order.module.css';
const Order = props => {
  const ingredients = [];
  for (let ingredient in props.ingredient) {
    ingredients.push({ name: ingredient, value: props.ingredient[ingredient] });
  }

  return (
    <div className={classes.Order}>
      Ingredients :
      {ingredients.map(i => {
        return (
          <span
            style={{
              textTransform: 'capitalize',
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid grey',
              padding: '5px'
            }}
            key={i.name}
          >
            {i.name}({i.value})
          </span>
        );
      })}
      <p>
        Price : <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
