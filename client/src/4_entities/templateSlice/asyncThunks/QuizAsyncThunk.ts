import {
    AsyncThunk,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import {
    getLSUser,
    setLSUserNull,
} from '6_shared/lib/helpers/localStorage/localStorage';
import { RootState } from '../../../1_app/providers/redux/store/store';
import {
    allQuestions,
    HOST,
} from '../index';
import {
    IAnswer,
    IQuestions,
    IQuizzes,
} from '../slice/userSlice';

interface responseData {
    data: IQuizzes;
    allQuestions: IQuestions[];
    allQuizzes: IQuizzes[];
    allAnswers: IAnswer[];
    error: unknown;
}

export const fetchQuizzesAll: AsyncThunk<any, any, any> = createAsyncThunk(
    'quizzes/get/all',
    async (userId: number, thunkAPI) => {
        try {
            const response: AxiosResponse<responseData | null> = await axios({
                    baseURL: HOST,
                    method: 'get',
                    url: `/user/${userId}/quiz_all`,
                    headers: { Authorization: getLSUser().token },
                },
            );
            if (response.status === 403) {
                thunkAPI.rejectWithValue(thunkAPI.signal);
            }

            return response.data;
        } catch (error) {
            setLSUserNull();
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const createQuiz: AsyncThunk<any, any, any> = createAsyncThunk(
    'createQuiz/post',
    async (data: { user_id: number, post_data: string }, thunkAPI) => {
        try {
            const response = await axios({
                method: 'post',
                url: `${HOST}/user/${data.user_id}/create_quiz`,
                data: data.post_data,
                headers: {
                    Authorization: getLSUser().token,
                },
            });

            if (response.status === 403) {
                thunkAPI.rejectWithValue(thunkAPI.signal);
            }

            return response.data.data;
        } catch (error) {
            setLSUserNull();
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const createQuestions: AsyncThunk<any, {
    user_id: number,
    quiz_id: number,
    question_id: number,
    post_data: string
}, any> = createAsyncThunk(
    'createQuestions/post',
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                baseURL: HOST,
                method: 'post',
                url: `/user/${data.user_id}/quiz/${data.quiz_id}/questions/${data.question_id}/answer_create`,
                data: {
                    answer_name: data.post_data,
                },
                headers: {
                    Authorization: getLSUser().token,
                },
            });

            if (response.status === 403) {
                thunkAPI.rejectWithValue(thunkAPI.signal);
            }

            const state = thunkAPI.getState() as RootState;
            console.log('state.user.allQuestions', state.user.allQuestions);
            state.user.allQuestions.map(questions => {
                if (questions.question_id === data.question_id) {
                    questions.answers;
                    // thunkAPI.dispatch(allQuestions());
                    console.log('questions', questions);
                }
            });
        } catch (error) {
            console.log('error', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);