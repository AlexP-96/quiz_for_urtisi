interface IDataUserLocalStorage {
    user_id?: number;
    email?: string;
    token?: string;
}

export const setLSUserNull = () => {
    localStorage.setItem(
        'data_user',
        JSON.stringify({
            user_id: '',
            email: '',
            token: '',
        }),
    );
};
export const getLSUser = (): IDataUserLocalStorage => {
    return JSON.parse(localStorage.getItem('data_user')) ?? {
        email: '',
        user_id: '',
        token: '',
    };
};

export const setLSUser = (object: IDataUserLocalStorage) => {
    localStorage.setItem(
        'data_user',
        JSON.stringify(object),
    );
};


