export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existed = cartItems.find(item => item.id === cartItemToAdd.id);
  if(existed) {
    return cartItems.map(item => (
      item.id === cartItemToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  }

  return [ ...cartItems, { ...cartItemToAdd, quantity: 1 } ];
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  return cartItems.filter(item => item.id !== cartItemToClear.id);
};

export const removeItem = (cartItems, cartItemToRemove) => {
  if(cartItemToRemove.quantity > 1) {
    return cartItems.map(item => (
      item.id === cartItemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  }

  return [ ...cartItems ];
};