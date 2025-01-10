import axios, { AxiosError } from 'axios';
import * as process from 'node:process';
import { getLSUser } from '../../lib/helpers/localStorage/localStorage';

interface IPostData {
    endpoint: string;
    data: any;
    headers?: any;
}

//todo подумать над реализацией заголовков, чтобы их подставлять
interface postData {

}

interface requestDataUser {
    user_id?: string | number;
    quiz_id?: string | number;
    question_id?: string | number;
    answer_id?: string | number;
    postData: {};
}

// console.log(process.env.REACT_APP_APi_URL);

export const getAllAnswer = async (data: requestDataUser) => {
    try {
        return await axios.get(
            `http://localhost:4000/user/${data.user_id}/quiz/${data.quiz_id}/question/${data.question_id}/answer_all`,
            {
                headers: { Authorization: getLSUser().token },
            },
        );
    } catch (error) {
        console.log(AxiosError);
    }
};

export const createAnswer = async (data: requestDataUser) => {
    try {
        return await axios({
            method: 'post',
            url: `http://localhost:4000/user/${data.user_id}/quiz/${data.quiz_id}/questions/${data.question_id}/answer_create`,
            data: data.postData,
        });
    } catch (error) {
        console.log(AxiosError);
    }
};
export const updateAnswer = async () => {

};
export const deleteAnswer = async () => {

};

export const axiosGetData = async (endpoint: string, load?: () => void) => {
    load();
    try {
        return await axios.get(
            `http://localhost:4000/user${endpoint}`,
            {
                headers: {
                    Authorization: getLSUser().token,
                },
            },
        );
    } catch (error) {
        return error.response;
    }

};

export const axiosPostData = async (endpoint: string, data: any) => {
    try {
        return await axios({
            method: 'post',
            url: `http://localhost:4000${endpoint}`,
            data: data,
        });
    } catch (error) {
        return error.response;
    }
};

export const axiosAuthPostData = async (endpoint: string, data: any, headers?: any) => {
    try {
        return await axios({
            method: 'post',
            url: `http://localhost:4000/user${endpoint}`,
            data,
            headers: {
                Authorization: getLSUser().token,
            },
        });
    } catch (error) {
        return {
            error: error.response.data.message,
            status: error.response.status,
        };
    }
};

export const axiosUpdateData = async (endpoint: string, data: any) => {
    return await axios.put(`http://localhost:4000/${endpoint}`, data);
};

export const axiosDeleteData = async (endpoint: string, data: any) => {
    return await axios.delete(`http://localhost:4000/${endpoint}`, data);
};