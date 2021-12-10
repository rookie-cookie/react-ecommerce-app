import CartActionTypes from './cart.types'

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
})

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item //payload can be anything, in this case it is the item we want to add to the cart 
})

export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
})

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
})