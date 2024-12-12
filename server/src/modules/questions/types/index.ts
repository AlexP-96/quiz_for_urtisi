export interface IQuestionGetAll {
    user_id: string,
    quiz_id: string,
}

export interface IQuestionDelete {
    question_id: number;
}

export interface IQuestionCreate {
    quiz_id: string;
    question_name: string;
}

export interface IQuestionGetOne {
    question_id: number;
}

export interface IQuestionUpdate {
    question_id: string;
    question_name: string;
}

export interface IQuestionService {
    findAll: (data: IQuestionGetAll) => Promise<any>;
    update: (data: IQuestionUpdate) => Promise<any>;
    create: (data: IQuestionCreate) => Promise<any>;
    findOne: (data: string | number) => Promise<any>;
    delete: (data: string | number) => Promise<any>;
}

export interface IQuestionDao {
    findAll: (data: string) => Promise<any>;
    create: (data: IQuestionCreate) => Promise<any>;
    update: (data: IQuestionUpdate) => Promise<any>;
    findOne: (data: string | number) => Promise<any>;
    delete: (data: string | number) => Promise<any>;
    
    
}