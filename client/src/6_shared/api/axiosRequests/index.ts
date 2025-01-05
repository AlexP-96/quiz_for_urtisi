import axios from 'axios';

interface IPostData {
    endpoint: string;
    data: any;
    headers?: any;
}

export const axiosGetData = async (endpoint: string) => {
    return await axios.get(`http://localhost:4000/${endpoint}`);
};

export const axiosPostData = (endpoint: string, data: any, headers?: any) => {
    try {
        return axios({
            method: 'post',
            url: `http://localhost:4000${endpoint}`,
            data: data,
            headers,
        });
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const axiosAuthPostData = (endpoint: string, data: any, headers?: any) => {
    try {
        return axios({
            method: 'post',
            url: `http://localhost:4000/user${endpoint}`,
            data: data,
            headers: {
                Authorization: JSON.parse(localStorage.getItem('data_user')).token,
            },
        });
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const axiosUpdateData = async (endpoint: string, data: any) => {
    return await axios.put(`http://localhost:4000/${endpoint}`, data);
};

export const axiosDeleteData = async (endpoint: string, data: any) => {
    return await axios.delete(`http://localhost:4000/${endpoint}`, data);
};