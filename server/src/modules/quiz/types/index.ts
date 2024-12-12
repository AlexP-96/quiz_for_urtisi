export interface IQuizUpdate {
    quiz_id: number;
    quiz_name: string;
}

export interface IQuizDelete {
    quiz_id: number;
}

export interface IQuizCreate {
    user_id: number;
    quiz_name: string;
}

export interface IQuizGetOne {
    quiz_id: number;
}

export interface IQuizUpdate {
    user_id: number;
    quiz_id: number;
}

export interface IQuizService {
    findAll: (data: string) => Promise<any>;
    update: (data: IQuizUpdate) => Promise<any>;
    create: (data: IQuizCreate) => Promise<any>;
    findOne: (data: string | number) => Promise<any>;
    delete: (data: string | number) => Promise<any>;
}

export interface IQuizDao {
    findAll: (data: string) => Promise<any>;
    create: (data: IQuizCreate) => Promise<any>;
    update: (data: IQuizUpdate) => Promise<any>;
    findOne: (data: string | number) => Promise<any>;
    delete: (data: string | number) => Promise<any>;
}