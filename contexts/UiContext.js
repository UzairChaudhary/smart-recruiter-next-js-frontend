"use client"
import { createContext, useContext, useReducer } from "react";
import { uiReducer } from "../reducers/uiReducer";

export const UiContext = createContext();

const initialState = {
  isDropdownOpen: false,
  isSidebarOpen: false,
  isUserLoggedIn: false,
  isUserCandidate: true,
};

export const UiProvider = ({ children }) => {
  const [ui, dispatch] = useReducer(uiReducer, initialState);

  return (
    <UiContext.Provider value={{ ...ui, dispatch }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => useContext(UiContext);






