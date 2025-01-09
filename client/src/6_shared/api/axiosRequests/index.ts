import axios from 'axios';
import {Simulate} from "react-dom/test-utils";

interface IPostData {
    endpoint: string;
    data: any;
    headers?: any;
}

//todo подумать над реализацией заголовков, чтобы их подставлять

export const axiosGetData = async (endpoint: string, load?: () => void) => {
    load();
    try {
        return await axios.get(
            `http://localhost:4000/user${endpoint}`,
            {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('data_user')).token,
                },
            },
        );
    } catch (error) {
        //  .setItem('data_user', JSON.stringify({email: '', token: '', user_id: ''}))
        return error.response
    }

};

export const axiosPostData = async (endpoint: string, data: any, headers?: any) => {
    try {
        return await axios({
            method: 'post',
            url: `http://localhost:4000${endpoint}`,
            data: data,
            headers,
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
                Authorization: JSON.parse(localStorage.getItem('data_user')).token,
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