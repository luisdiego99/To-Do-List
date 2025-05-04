import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './reducers/todoSlice';
import goalReducer from './reducers/goalSlice';
import logger from './middleware/logger';
import checker from './middleware/checker';

const store = configureStore({
    reducer: {
        todos: todoReducer,
        goals: goalReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(logger, checker)
});

export default store;  // Correct export