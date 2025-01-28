import axios, {
    AxiosError,
    AxiosResponse,
} from 'axios';
import { getLSUser } from '../../lib/helpers/localStorage/localStorage';

const HOST = 'http://localhost:4000';

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

type requestDataAnswerDel<T = {}> = Omit<requestDataUser, 'postData'>
type requestDataAnswerChange<T = {}> = requestDataUser;

//USER
export const loginUserAxios = async (
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

export const registerUserAxios = async (
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

export const createQuizAxios = async (
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
                Authorization: getLSUser().token,
            },
        });
    } catch (error) {
        return error;
    }
};

export const updateQuizAxios = async (
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
                Authorization: getLSUser().token,
            },
        });
    } catch (error) {
        return error;
    }
};

export const deleteQuizAxios = async (
    data: requestDataUser,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios({
            method: 'delete',
            url: `${HOST}/user/${data.user_id}/delete_quiz/${data.quiz_id}`,
            headers: {
                Authorization: getLSUser().token,
            },
        });
    } catch (error) {
        return error;
    }
};

//QUESTIONS

export const getAllQuestionAxios = async (
    data: requestDataUser,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios.get(
            `${HOST}/user/${data.user_id}/questions/${data.quiz_id}/question_all`,
            {
                headers: { Authorization: getLSUser().token },
            },
        );
    } catch (error) {
        return error;
    }
};

export const createQuestionAxios = async (
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
                Authorization: getLSUser().token,
            },
        });
    } catch (error) {
        return error;
    }
};

export const updateQuestionAxios = async (
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
                Authorization: getLSUser().token,
            },
        });
    } catch (error) {
        return error;
    }
};

export const deleteQuestionAxios = async (
    data: requestDataUser,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        return await axios({
            method: 'delete',
            url: `${HOST}/user/${data.user_id}/questions/${data.quiz_id}/question_delete/${data.question_id}`,
            headers: {
                Authorization: getLSUser().token,
            },
        });
    } catch (error) {
        return error;
    }
};

//ANSWERS
export const getAllAnswerAxios = async (data: requestDataUser, callback: () => void) => {
    callback();
    try {
        return await axios.get(
            `${HOST}/user/${data.user_id}/quiz/${data.quiz_id}/question/${data.question_id}/answer_all`,
            {
                headers: { Authorization: getLSUser().token },
            },
        );
    } catch (error) {
        return error;
    }
};

export const createAnswerAxios = async (
    data: requestDataUser<string>,
    callback: () => void,
): Promise<AxiosResponse | AxiosError> => {
    callback();
    try {
        console.log('data.postData', data);
        return await axios({
            baseURL: HOST,
            method: 'post',
            url: `/user/${data.user_id}/quiz/${data.quiz_id}/questions/${data.question_id}/answer_create`,
            data: {
                answer_name: data.postData,
            },
            headers: {
                Authorization: getLSUser().token,
            },
        });
    } catch (error) {
        return error;
    }
};

export const updateAnswerAxios = async (data: requestDataAnswerChange<string>) => {
    try {
        console.log('data_update', data);
        return await axios({
            method: 'patch',
            url: `${HOST}/user/${data.answer_id}/answer_update`,
            ///:user_id/quiz/:quiz_id/question/:question_id/answer_update/:answer_id
            data: { answer_name: data.postData },
            headers: {
                Authorization: getLSUser().token,
            },
        });
    } catch (error) {
        return error;
    }
};

export const deleteAnswerAxios = async (data: requestDataAnswerDel) => {
    try {
        return await axios({
            baseURL: HOST,
            method: 'delete',
            url: `/user/${data.user_id}/quiz/${data.quiz_id}/questions/${data.question_id}/answer_delete/${data.answer_id}`,
            headers: {
                Authorization: getLSUser().token,
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