import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    user_id: string | null;
    email: string;
    quiz: string;
    question: {};
    answers: {};
}

const initialState: UserState = {
    user_id: null,
    email: '',
    quiz: '',
    answers: {},
    question: {},
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userId: (state: UserState, action: { payload: string }) => {
            state.user_id = action.payload;
        },
        emailUser: (state: UserState, action: { payload: string }) => {
            state.email = String(action.payload);
        },
        quizUserName: (state: UserState, action: { payload: string }) => {
            state.quiz = action.payload;
        },
        questionUserName: (state: UserState, action: { payload: {} }) => {
            state.question = action.payload;
        },
        answersUser: (state: UserState, action: { payload: {} }) => {
            state.answers = action.payload;
        },
    },
});

export const {
    userId,
    emailUser,
    quizUserName,
    questionUserName,
    answersUser,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
