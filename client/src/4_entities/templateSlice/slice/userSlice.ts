import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { fetchQuizzesAll } from '../asyncThunks/QuizAsyncThunk';

interface UserState {
    loadStatus: 'loading' | 'succeeded' | 'failed';
    error: unknown | null;
    user_id: number | null;
    email: string | null;
    quiz: string;
    question: string;
    answers: string;
    allQuizzes: [];
}

const initialState: UserState = {
    loadStatus: 'loading',
    error: null,
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
        isLoading: (state: UserState, action: PayloadAction<'loading' | 'succeeded' | 'failed'>) => {
            state.loadStatus = action.payload;
        },
        userId: (state: UserState, action: PayloadAction<number>) => {
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
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizzesAll.pending, (state) => {
                state.loadStatus = 'loading';
            })
            .addCase(fetchQuizzesAll.fulfilled, (state, action) => {
                state.loadStatus = 'succeeded';
                state.allQuizzes = action.payload;
            })
            .addCase(fetchQuizzesAll.rejected, (state, action) => {
                state.loadStatus = 'failed';
                state.error = action.payload;
            });
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
    errorUser,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
