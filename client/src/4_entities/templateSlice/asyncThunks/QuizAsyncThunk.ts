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
    allAnswers,
    allQuestions,
    emailUser,
    HOST,
    userId,
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
    async (user_id: number, thunkAPI) => {
        try {
            const response: AxiosResponse<responseData | null> = await axios({
                    baseURL: HOST,
                    method: 'get',
                    url: `/user/${user_id}/quiz_all`,
                    headers: { Authorization: getLSUser().token },
                },
            );
            if (response.status === 403) {
                thunkAPI.rejectWithValue(thunkAPI.signal);
            }

            return response.data;
        } catch (error) {
            setLSUserNull();
            //todo почитать доку про редакс, как не дублировать диспатчи
            thunkAPI.dispatch(userId(''));
            thunkAPI.dispatch(emailUser(''));
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
            thunkAPI.dispatch(userId(''));
            thunkAPI.dispatch(emailUser(''));
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const createAnswer: AsyncThunk<any, {
    user_id: number,
    quiz_id: number,
    question_id: number,
    post_data: string
}, any> = createAsyncThunk(
    'createAnswer/post',
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
            console.log('state.user.allQuestions', state.user.allAnswers);
            thunkAPI.dispatch(allAnswers([
                ...state.user.allAnswers,
                response.data.data,
            ]));

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const updateAnswer: AsyncThunk<any, { answer_id: number, post_data: string }
    , any> = createAsyncThunk(
    'updateAnswer/post',
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                baseURL: HOST,
                method: 'patch',
                data: {
                    answer_name: data.post_data,
                },
                url: `/user/${data.answer_id}/answer_update`,
                headers: {
                    Authorization: getLSUser().token,
                },
            });

            if (response.status === 403) {
                thunkAPI.rejectWithValue(thunkAPI.signal);
            }

            const state = thunkAPI.getState() as RootState;
            state.user.allAnswers.map((answer) => {
                if(answer.answer_id === Number(response.data.data.answer_id)) {

                }
            })
            console.log('response_update', response.data.data);

            // const result = state.user.allAnswers.filter((answer) => answer.answer_id !== Number(response.data.data.delete));
            // thunkAPI.dispatch(allAnswers(result));
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const deleteAnswer: AsyncThunk<any, { answer_id: number }
    , any> = createAsyncThunk(
    'deleteAnswer/post',
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                baseURL: HOST,
                method: 'delete',
                url: `/user/${data.answer_id}/answer_delete`,
                headers: {
                    Authorization: getLSUser().token,
                },
            });
            if (response.status === 403) {
                thunkAPI.rejectWithValue(thunkAPI.signal);
            }

            const state = thunkAPI.getState() as RootState;
            const result = state.user.allAnswers.filter((answer) => answer.answer_id !== Number(response.data.data.delete));
            thunkAPI.dispatch(allAnswers(result));
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

