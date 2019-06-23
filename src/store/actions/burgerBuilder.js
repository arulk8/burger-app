import * as actionTypes from './actionTypes';
import axios from '../../services/axios-orders';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return { type: actionTypes.REMOVE_INGREDIENT, ingredientName: name };
};

export const setIngredients = ingredients => {
  return { type: actionTypes.SET_INGREDENTS, ingredients: ingredients };
};

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDENTS_FAILED
  };
};
export const initIngredents = () => {
  return dispatch => {
    axios
      .get('/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        dispatch(fetchIngredientFailed());
      });
  };
};
