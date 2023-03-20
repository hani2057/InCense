import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice/rootSlice";


// const customHistory = createBrowserHistory();


const store = configureStore({
  reducer: rootReducer,

});


export default store;