import { configureStore } from '@reduxjs/toolkit';
import {
    modalReducer,
    userReducer,
} from '4_entities/templateSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        modal: modalReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
