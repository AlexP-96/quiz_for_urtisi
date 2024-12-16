export interface IAnswerGetAll {
    quiz_id: string,
    question_id: string,
}

export interface IAnswerDelete {
    answer_id: number;
}

export interface IAnswerCreate {
    question_id: string;
    answer_name: string;
}

export interface IAnswerGetOne {
    answer_id: number;
}

export interface IAnswerUpdate {
    answer_id: string;
    answer_name: string;
}

export interface IAnswerService {
    findAll: (data: IAnswerGetAll) => Promise<any>;
    update: (data: IAnswerUpdate) => Promise<any>;
    create: (data: IAnswerCreate) => Promise<any>;
    findOne: (data: string | number) => Promise<any>;
    delete: (data: string | number) => Promise<any>;
}

export interface IAnswerDao {
    findAll: (data: string) => Promise<any>;
    create: (data: IAnswerCreate) => Promise<any>;
    update: (data: IAnswerUpdate) => Promise<any>;
    findOne: (data: string | number) => Promise<any>;
    delete: (data: string | number) => Promise<any>;


}