import { UnknownAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../1_app/providers/redux/store/store';
import { getLSUser } from '../../../6_shared/lib/helpers/localStorage/localStorage';
import { allQuizzes } from '../slice/userSlice';

const HOST = 'http://localhost:4000';

const GetAllQuizAction = (
    user_id: string,
    callback: () => void,
): ThunkAction<void, RootState, unknown, UnknownAction> => async (dispatch, getState) => {
    try {
        callback();
        const response: AxiosResponse<{ data: [] | null, error: null | {} }> = await axios({
                baseURL: HOST,
                method: 'get',
                url: `/user/${user_id}/quiz_all`,
                headers: { Authorization: getLSUser().token },
            },
        );
        console.log(getState);
        dispatch(allQuizzes(response.data.data));
    } catch (error) {
        return error;
    }
};