import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import {
    createAnswer,
    fetchQuizzesAll,
} from '../asyncThunks/QuizAsyncThunk';

export interface IQuizzes {
    createdAt: string;
    quiz_id: number;
    quiz_name: string;
    updatedAt: string;
    user_id: number;
}

export interface IQuestions {
    createdAt: string;
    question_id: number;
    question_name: string;
    quiz_id: number;
    updatedAt: string;
    answers?: IAnswer[];
}

export interface IAnswer {
    answer_id: number;
    answer_name: string;
    createdAt: string;
    question_id: number;
    type: string;
    updatedAt: string;
}

interface UserState {
    loadStatus: 'loading' | 'succeeded' | 'failed';
    error: unknown | null;
    user_id: number | string | null;
    email: string | null;
    quiz: string;
    question: string;
    answers: string;
    allQuizzes: [];
    allQuestions: IQuestions[];
    allAnswers: IAnswer[];
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
    allAnswers: [],
    allQuestions: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isLoading: (state: UserState, action: PayloadAction<'loading' | 'succeeded' | 'failed'>) => {
            state.loadStatus = action.payload;
        },
        userId: (state: UserState, action: PayloadAction<number | string>) => {
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
        allQuestions: (state: UserState, action: PayloadAction<any>) => {
            state.allQuestions = action.payload;
        },
        allAnswers: (state: UserState, action: PayloadAction<IAnswer[]>) => {
            state.allAnswers = action.payload;
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
                state.allQuestions = action.payload.allQuestions;
                state.allQuizzes = action.payload.data;
                state.allAnswers = action.payload.allAnswers;
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
    allQuestions,
    allAnswers
} = userSlice.actions;

export const userReducer = userSlice.reducer;
