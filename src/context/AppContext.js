import React, { useReducer, createContext, useContext } from 'react';

const AppContext = createContext();
const INITIAL_STATE = { authenticated: null, user: null, bluetooth: null };

const AppReducer = (state, action) => {
  console.info(`APP CONTEXT: ${action.type}`);
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, authenticated: true, user: action.payload };
    case "FIRST_TIME":
      return { ...state, firstTime: action.payload };
    case "SIGN_OUT":
      return { ...state, authenticated: false, user: null };
      case "BLUETOOTH":
        return { ...state, bluetooth: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
