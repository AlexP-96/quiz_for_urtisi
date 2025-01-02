import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    user_id: string | null;
    email: string;
}

const initialState: UserState = {
    user_id: null,
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userId: (state: UserState, action: { payload: string }) => {
            state.user_id = action.payload;
        },
        emailUser: (state: UserState, action: { payload: string }) => {
            state.email = action.payload;
        },
    },
});

export const {
    userId,
    emailUser
} = userSlice.actions;

export const userReducer = userSlice.reducer;
