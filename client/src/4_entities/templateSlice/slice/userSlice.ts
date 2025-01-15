import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import axios, {
    AxiosError,
    AxiosResponse,
} from 'axios';
import { getLSUser } from '../../../6_shared/lib/helpers/localStorage/localStorage';

interface UserState {
    loadStatus: 'loading' | 'succeeded' | 'failed';
    error: unknown | null;
    user_id: string | null;
    email: string | null;
    quiz: string;
    question: string;
    answers: string;
    allQuizzes: [];
}

const HOST = 'http://localhost:4000';

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

export const fetchQuizzesAll = createAsyncThunk(
    'quizzes/get/all',
    async (userId: string, thunkAPI) => {
        try {
            const response: AxiosResponse<{ data: [] | null, error: null | {} }> = await axios({
                    baseURL: HOST,
                    method: 'get',
                    url: `/user/${userId}/quiz_all`,
                    headers: { Authorization: getLSUser().token },
                },
            );
            console.log(thunkAPI.getState())
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isLoading: (state: UserState, action: PayloadAction<'loading' | 'succeeded' | 'failed'>) => {
            state.loadStatus = action.payload;
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
