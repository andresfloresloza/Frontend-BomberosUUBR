import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginReducer from "./loginSlice";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, loginReducer);

const store = configureStore({
  reducer: {
    login: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
