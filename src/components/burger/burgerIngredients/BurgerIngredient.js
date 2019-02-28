import React from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredeint.module.css';
const BurgerIngredient = props => {
  let ingredent = null;
  switch (props.type) {
    case 'bread-bottom':
      ingredent = <div className={classes.BreadBottom} />;
      break;
    case 'bread-top':
      ingredent = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      );
      break;
    case 'meat':
      ingredent = <div className={classes.Meat} />;
      break;
    case 'cheese':
      ingredent = <div className={classes.Cheese} />;
      break;
    case 'salad':
      ingredent = <div className={classes.Salad} />;
      break;
    case 'bacon':
      ingredent = <div className={classes.Bacon} />;
      break;
    default:
      ingredent = null;
  }

  return ingredent;
};
BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};
export default BurgerIngredient;
