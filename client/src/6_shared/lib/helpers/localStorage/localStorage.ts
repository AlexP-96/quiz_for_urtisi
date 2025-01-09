interface IDataUserLocalStorage {
    user_id?: string;
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
    return JSON.parse(localStorage.getItem('data_user'));
};

export const setLSUser = (object: IDataUserLocalStorage) => {
    localStorage.setItem(
        'data_user',
        JSON.stringify(object),
    );
}


