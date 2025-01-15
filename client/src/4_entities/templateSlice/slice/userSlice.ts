import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
    load: boolean;
    errorUser: string | null;
    user_id: string | null;
    email: string | null;
    quiz: string;
    question: string;
    answers: string;
    allQuizzes: [];
}

const initialState: UserState = {
    load: false,
    errorUser: null,
    user_id: null,
    email: null,
    quiz: '',
    answers: '',
    question: '',
    allQuizzes: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isLoading: (state: UserState, action: PayloadAction<boolean>) => {
            state.load = action.payload;
        },
        userId: (state: UserState, action: PayloadAction<string>) => {
            state.user_id = action.payload;
        },
        emailUser: (state: UserState, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        quizUserName: (state: UserState, action: PayloadAction<string>) => {
            state.quiz = action.payload;
        },
        questionUserText: (state: UserState, action: PayloadAction<string>) => {
            state.question = action.payload;
        },
        answersUser: (state: UserState, action: PayloadAction<string>) => {
            state.answers = action.payload;
        },
        allQuizzes: (state: UserState, action: PayloadAction<[]>) => {
            state.allQuizzes = action.payload;
        },
        errorUser: (state: UserState, action: PayloadAction<string>) => {
            state.errorUser = action.payload
        }
    },
});

export const {
    userId,
    emailUser,
    quizUserName,
    questionUserText,
    answersUser,
    allQuizzes,
    isLoading,
    errorUser
} = userSlice.actions;

export const userReducer = userSlice.reducer;
