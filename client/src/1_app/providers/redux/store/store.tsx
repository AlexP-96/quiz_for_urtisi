import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '4_entities/templateSlice';


export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
