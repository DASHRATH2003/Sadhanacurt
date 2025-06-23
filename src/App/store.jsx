import { configureStore } from "@reduxjs/toolkit";
import alertsSlice from "../Features/alertsSlice";
import formsSlice from "../Features/formsSlice";
import globalSlice from "../Features/globalSlice";
import loadingSlice from "../Features/loadingSlice";
import productsSlice from "../Features/productsSlice";
import userSlice from "../Features/userSlice";

// Subscribe to store changes and save to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      user: state.user,
      products: state.products,
    });
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Could not save state:', err);
  }
};

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state:', err);
    return undefined;
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    global: globalSlice,
    user: userSlice,
    products: productsSlice,
    forms: formsSlice,
    alerts: alertsSlice,
    loading: loadingSlice,
  },
  preloadedState,
});

// Subscribe to store changes
store.subscribe(() => {
  saveState(store.getState());
});
