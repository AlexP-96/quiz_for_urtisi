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
    allAnswersReducer,
    allQuestionsReducer,
    allQuizzesUserReducer,
    answersValueUserReducer,
    emailUserReducer,
    HOST,
    questionValueUserReducer,
    quizValueUserReducer,
    userIdReducer,
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
            thunkAPI.dispatch(userIdReducer(''));
            thunkAPI.dispatch(emailUserReducer(''));
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const createQuiz: AsyncThunk<any, { user_id: number, post_data: string }, any> = createAsyncThunk(
    'createQuiz/post',
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                baseURL: HOST,
                method: 'post',
                url: `/user/${data.user_id}/create_quiz`,
                data: { quiz_name: data.post_data },
                headers: {
                    Authorization: getLSUser().token,
                },
            });

            if (response.status === 403) {
                thunkAPI.rejectWithValue(thunkAPI.signal);
            }

            const { user } = thunkAPI.getState() as RootState;

            thunkAPI.dispatch(allQuizzesUserReducer([
                ...user.allQuizzes,
                {
                    ...response.data.data,
                    user_id: Number(response.data.data.user_id),
                },
            ]));
            thunkAPI.dispatch(quizValueUserReducer(''));
        } catch (error) {
            setLSUserNull();
            thunkAPI.dispatch(userIdReducer(''));
            thunkAPI.dispatch(emailUserReducer(''));
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const deleteQuiz: AsyncThunk<any, { user_id: number, quiz_id: number }, any> = createAsyncThunk(
    'deleteQuiz/delete',
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                baseURL: HOST,
                method: 'delete',
                url: `/user/${data.user_id}/delete_quiz/${data.quiz_id}`,
                headers: {
                    Authorization: getLSUser().token,
                },
            });

            if (response.status === 403) {
                thunkAPI.rejectWithValue(thunkAPI.signal);
            }

            const { user } = thunkAPI.getState() as RootState;

            thunkAPI.dispatch(allQuizzesUserReducer(user.allQuizzes.filter((quiz) => quiz.quiz_id !== response.data.data.quiz_id)));
        } catch (error) {
            setLSUserNull();
            thunkAPI.dispatch(userIdReducer(''));
            thunkAPI.dispatch(emailUserReducer(''));
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const updateQuiz: AsyncThunk<any, { user_id: number, quiz_id: number }, any> = createAsyncThunk(
    'updateQuiz/patch',
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                baseURL: HOST,
                method: 'delete',
                url: `/user/${data.user_id}/delete_quiz/${data.quiz_id}`,
                headers: {
                    Authorization: getLSUser().token,
                },
            });

            if (response.status === 403) {
                thunkAPI.rejectWithValue(thunkAPI.signal);
            }

            const { user } = thunkAPI.getState() as RootState;

            thunkAPI.dispatch(allQuizzesUserReducer(user.allQuizzes.filter((quiz) => quiz.quiz_id !== response.data.data.quiz_id)));
        } catch (error) {
            setLSUserNull();
            thunkAPI.dispatch(userIdReducer(''));
            thunkAPI.dispatch(emailUserReducer(''));
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const createQuestion: AsyncThunk<any, { user_id: number, quiz_id: number, post_data: string }, {
    state: RootState
}> = createAsyncThunk(
    'createQuestion/post',
    async (data, thunkAPI) => {
        try {
            const response = await axios({
                baseURL: HOST,
                method: 'post',
                url: `/user/${data.user_id}/questions/${data.quiz_id}/question_create`,
                data: { question_name: data.post_data },
                headers: {
                    Authorization: getLSUser().token,
                },
            });

            if (response.status === 403) {
                thunkAPI.rejectWithValue(thunkAPI.signal);
            }

            const { user } = thunkAPI.getState() as RootState;

            thunkAPI.dispatch(allQuestionsReducer([
                ...user.allQuestions,
                {
                    ...response.data.data,
                    quiz_id: Number(response.data.data.quiz_id),
                },
            ]));

            thunkAPI.dispatch(questionValueUserReducer(''));
        } catch (error) {
            setLSUserNull();
            thunkAPI.dispatch(userIdReducer(''));
            thunkAPI.dispatch(emailUserReducer(''));

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
            const {
                dispatch,
                getState,
                rejectWithValue,
                signal,
            } = thunkAPI;
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
                rejectWithValue(signal);
            }

            const state = getState() as RootState;

            dispatch(answersValueUserReducer(''));
            dispatch(allAnswersReducer([
                ...state.user.allAnswers,
                response.data.data,
            ]));
            dispatch(answersValueUserReducer(''));
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const updateAnswer: AsyncThunk<any, { answer_id: number, post_data: string }, any> = createAsyncThunk(
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

            return {
                answer_id: Number(response.data.data.answer_id),
                answer_name: response.data.data.answer_name,
            };

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);
//todo добавить payload-ом юзер, квиз, квешен, айди
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
            thunkAPI.dispatch(allAnswersReducer(result));
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

