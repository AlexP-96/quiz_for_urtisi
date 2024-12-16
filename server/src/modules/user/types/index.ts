export interface IUser {
    user_id?: number;
    email?: string;
    password?: string;
    token?: string;
    success?: boolean;
}

export interface IUserLoginRegister {
    email: string;
    password: string;
}

export interface IUserLoginParams {
    email: string;
    password: string;
}

export interface IUserGetAll {
    user_id?: number;
}

export type None<T> = T | undefined;
