import {
    AsyncThunk,
    AsyncThunkAction,
    createAsyncThunk,
    GetThunkAPI,
    UnknownAction,
} from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import {
    getLSUser,
    setLSUserNull,
} from '6_shared/lib/helpers/localStorage/localStorage';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../1_app/providers/redux/store/store';
import {
    allQuizzes,
    HOST,
} from '../index';

export const fetchQuizzesAll: AsyncThunk<any, any, any> = createAsyncThunk(
    'quizzes/get/all',
    async (userId: number, thunkAPI) => {
        try {
            //todo написать тип для ответа с сервера
            const response: AxiosResponse<{ data: [] | null, error: null | {} }> = await axios({
                    baseURL: HOST,
                    method: 'get',
                    url: `/user/${userId}/quiz_all`,
                    headers: { Authorization: getLSUser().token },
                },
            );
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

export const fetchQuizTest = (user_id: number): ThunkAction<void, RootState, unknown, UnknownAction> => async (dispatch) => {
    try {
        const response: AxiosResponse<{ data: [] | null, error: null | {} }> = await axios({
                baseURL: HOST,
                method: 'get',
                url: `/user/${user_id}/quiz_all`,
                headers: { Authorization: getLSUser().token },
            },
        );
        if (response.status === 403) {
            console.log('403');
        }
        dispatch(allQuizzes(response.data.data));
        // return response.data.data;
    } catch (error) {
        setLSUserNull();
        return error.message;
    }
};