import {createSlice} from '@reduxjs/toolkit';

interface UserState {
    load: boolean;
    errorUser: string | null;
    user_id: string | null;
    email: string;
    quiz: string;
    question: string;
    answers: string;
    arrQuizDb: [];
}

//todo убрать лишние ключи из стэйта и сделать меньше редюсеров
const initialState: UserState = {
    load: false,
    errorUser: null,
    user_id: null,
    email: '',
    quiz: '',
    answers: '',
    question: '',
    arrQuizDb: [],
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
        errorUser: (state: UserState, action: { payload: string }) => {
            state.errorUser = action.payload
        }
    },
});

export const {
    userId,
    emailUser,
    quizUserName,
    questionUserName,
    answersUser,
    arrQuizDb,
    isLoading,
    errorUser
} = userSlice.actions;

export const userReducer = userSlice.reducer;
