import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    user_id: number | null;
}

const initialState: UserState = {
    user_id: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userId: (state: UserState, action: { payload: number }) => {
            state.user_id = action.payload;
        },
    },
});

export const {
    userId,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
