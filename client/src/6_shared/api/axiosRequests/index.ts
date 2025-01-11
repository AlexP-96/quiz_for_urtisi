import axios, {
    AxiosError,
    AxiosResponse,
} from 'axios';
import { getLSUser } from '../../lib/helpers/localStorage/localStorage';

const HOST = 'http://localhost:4000';
const TOKEN = getLSUser().token;

interface postDataUser {
    email: string;
    password: string;
}

interface postDataQuiz {
    quiz_name: string;
}

interface postDataQuestion {
    question_name: string;
}

interface postDataAnswer {
    answer_name: string;
}

interface requestDataUser<T = {}> {
    user_id?: string | number;
    quiz_id?: string | number;
    question_id?: string | number;
    answer_id?: string | number;
    postData?: T;
}

//USER
export const loginUser = async (
    data: postDataUser,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios({
                baseURL: HOST,
                method: 'post',
                url: `/login`,
                data: data,
            },
        );
    } catch (error) {
        return error;
    }
};

export const registerUser = async (
    data: requestDataUser<postDataUser>,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios({
                baseURL: HOST,
                method: 'post',
                url: `/register`,
                data: data.postData,
            },
        );
    } catch (error) {
        return error;
    }
};

//QUIZZES
export const getAllQuiz = async (data: requestDataUser, callback: () => void): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios.get(
            `${HOST}/user/${data.user_id}/quiz_all`,
            {
                headers: { Authorization: TOKEN },
            },
        );
    } catch (error) {
        return error;
    }
};

export const createQuiz = async (
    data: requestDataUser<postDataQuiz>,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios({
            method: 'post',
            url: `${HOST}/user/${data.user_id}/create_quiz`,
            data: data.postData,
            headers: {
                Authorization: TOKEN,
            },
        });
    } catch (error) {
        return error;
    }
};

export const updateQuiz = async (
    data: requestDataUser<postDataQuiz>,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios({
            method: 'patch',
            url: `${HOST}/user/${data.user_id}/update_quiz/${data.quiz_id}`,
            data: data.postData,
            headers: {
                Authorization: TOKEN,
            },
        });
    } catch (error) {
        return error;
    }
};

export const deleteQuiz = async (
    data: requestDataUser,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios({
            method: 'delete',
            url: `${HOST}/user/${data.user_id}/delete_quiz/${data.quiz_id}`,
            headers: {
                Authorization: TOKEN,
            },
        });
    } catch (error) {
        return error;
    }
};

//QUESTIONS

export const getAllQuestion = async (
    data: requestDataUser,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios.get(
            `${HOST}/user/${data.user_id}/questions/${data.quiz_id}/question_all`,
            {
                headers: { Authorization: TOKEN },
            },
        );
    } catch (error) {
        return error;
    }
};

export const createQuestion = async (
    data: requestDataUser<postDataQuestion>,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios({
            method: 'post',
            url: `${HOST}/user/${data.user_id}/questions/${data.quiz_id}/question_create`,
            data: data.postData,
            headers: {
                Authorization: TOKEN,
            },
        });
    } catch (error) {
        return error;
    }
};

export const updateQuestion = async (
    data: requestDataUser<postDataQuestion>,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios({
            method: 'patch',
            url: `${HOST}/user/${data.user_id}/questions/${data.quiz_id}/question_update/${data.question_id}`,
            data: data.postData,
            headers: {
                Authorization: TOKEN,
            },
        });
    } catch (error) {
        return error;
    }
};

export const deleteQuestion = async (
    data: requestDataUser,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios({
            method: 'delete',
            url: `${HOST}/user/${data.user_id}/questions/${data.quiz_id}/question_delete/${data.question_id}`,
            headers: {
                Authorization: TOKEN,
            },
        });
    } catch (error) {
        return error;
    }
};

//ANSWERS
export const getAllAnswer = async (data: requestDataUser, callback: () => void) => {
    callback();
    try {
        return await axios.get(
            `${HOST}/user/${data.user_id}/quiz/${data.quiz_id}/question/${data.question_id}/answer_all`,
            {
                headers: { Authorization: TOKEN },
            },
        );
    } catch (error) {
        return error;
    }
};

export const createAnswer = async (data: requestDataUser<postDataAnswer>) => {
    try {
        return await axios({
            method: 'post',
            url: `${HOST}/user/${data.user_id}/quiz/${data.quiz_id}/questions/${data.question_id}/answer_create`,
            data: data.postData,
            headers: {
                Authorization: TOKEN,
            },
        });
    } catch (error) {
        return error;
    }
};

export const updateAnswer = async (data: requestDataUser<postDataAnswer>) => {
    try {
        return await axios({
            method: 'patch',
            url: `${HOST}/user/${data.user_id}/quiz/${data.quiz_id}/questions/${data.question_id}/answer_update/${data.answer_id}`,
            data: data.postData,
            headers: {
                Authorization: TOKEN,
            },
        });
    } catch (error) {
        return error;
    }
};

export const deleteAnswer = async (data: requestDataUser) => {
    try {
        return await axios({
            method: 'delete',
            url: `${HOST}/user/${data.user_id}/quiz/${data.quiz_id}/questions/${data.question_id}/answer_delete/${data.answer_id}`,
            headers: {
                Authorization: TOKEN,
            },
        });
    } catch (error) {
        return error;
    }
};

//TODO НУЖНО ИХ УДАЛИТЬ
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