import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    load: boolean;
    user_id: string | null;
    email: string;
    quiz: string;
    question: string;
    answers: string;
    arrQuizDb: [];
    arrQuestionDb: [];
    arrAnswersDb: [];
}

const initialState: UserState = {
    load: false,
    user_id: null,
    email: '',
    quiz: '',
    answers: '',
    question: '',
    arrAnswersDb: [],
    arrQuizDb: [],
    arrQuestionDb: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isLoading: (state: UserState, action: { payload: boolean }) => {
            state.load = action.payload;
        },
        userId: (state: UserState, action: { payload: string }) => {
            state.user_id = action.payload;
        },
        emailUser: (state: UserState, action: { payload: string }) => {
            state.email = action.payload;
        },
        quizUserName: (state: UserState, action: { payload: string }) => {
            state.quiz = action.payload;
        },
        questionUserName: (state: UserState, action: { payload: string }) => {
            state.question = action.payload;
        },
        answersUser: (state: UserState, action: { payload: string }) => {
            state.answers = action.payload;
        },
        arrQuizDb: (state: UserState, action: { payload: [] }) => {
            state.arrQuizDb = action.payload;
        },
        arrQuestionDb: (state: UserState, action: { payload: [] }) => {
            state.arrQuestionDb = action.payload;
        },
        arrAnswersDb: (state: UserState, action: { payload: [] }) => {
            state.arrAnswersDb = action.payload;
        },
    },
});

export const {
    userId,
    emailUser,
    quizUserName,
    questionUserName,
    answersUser,
    arrQuizDb,
    arrAnswersDb,
    arrQuestionDb,
    isLoading
} = userSlice.actions;

export const userReducer = userSlice.reducer;
