import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + (action.payload.quantity ?? 1) }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: action.payload.id,
            quantity: action.payload.quantity ?? 1,
            ...action.payload.item,
          },
        ],
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, delta } = action.payload;
      return {
        items: state.items
          .map((i) =>
            i.id === id
              ? { ...i, quantity: Math.max(0, i.quantity + delta) }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((i) => i.id !== action.payload.id),
      };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = useCallback((item, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { id: item.id, item, quantity } });
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, delta } });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  }, []);

  const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);
  const totalSum = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const value = {
    items: state.items,
    totalItems,
    totalSum,
    addToCart,
    updateQuantity,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
