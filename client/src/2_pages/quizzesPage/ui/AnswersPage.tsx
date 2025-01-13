import axios, {
    AxiosError,
    AxiosResponse,
} from 'axios';
import React, {
    FC,
    FormEvent,
    Fragment,
    useState,
} from 'react';
import { Simulate } from 'react-dom/test-utils';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { useParams } from 'react-router-dom';
import { answersUser } from '../../../4_entities/templateSlice';
import { SelectorUserAnswers } from '../../../4_entities/templateSlice/model/selectors';
import {
    deleteAnswerAxios,
    updateAnswerAxios,
} from '../../../6_shared/api/axiosRequests';
import { getLSUser } from '../../../6_shared/lib/helpers/localStorage/localStorage';
import { BtnPopUpCloseModal } from '../../../6_shared/ui/Buttons';
import BtnPopUpOpenModal from '../../../6_shared/ui/Buttons/ui/BtnPopUpOpenModal';
import { FormModal } from '../../../6_shared/ui/Forms';
import InputModal from '../../../6_shared/ui/Inputs/ui/InputModal';
import {
    ListGroupBody,
    ListGroupWrapper,
} from '../../../6_shared/ui/ListGroup';
import ModalPopUp from '../../../6_shared/ui/Modals/ui/ModalPopUp';
import error = Simulate.error;

enum nameModalIdAnswers {
    change = 'modal-change-answer-',
    delete = 'modal-delete-answer-'
}

interface IAnswerData {
    answer_name: string;
    answer_id: number;
    type: string;
    question_id: number;
}

type TypeIds = { answer_id: number, question_id: number }

interface PropsAnswersList {
    answersArr: IAnswerData[];
}

const AnswersPage: FC<PropsAnswersList> = (props) => {
    const { answersArr } = props;

    const { quiz_id } = useParams();
    console.log('answersArr', answersArr);
    const [answerId, setAnswerId] = useState<number>(null);

    const answerValueSelector = useSelector(SelectorUserAnswers);

    const dispatch = useDispatch();

    const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(answersUser(e.target.value));
    };

    const submitFormAnswer = (e: FormEvent<HTMLFormElement>, ids: TypeIds) => {
        e.preventDefault();
        updateAnswerAxios({
            user_id: getLSUser().user_id,
            quiz_id,
            question_id: ids.question_id,
            answer_id: ids.answer_id,
            postData: answerValueSelector,
        })
            .then((response: AxiosResponse) => {
                dispatch(answersUser(''));
            })
            .catch((error: AxiosError) => {
                return error;
            });
    };

    const submitFormDeleteAnswer = (e: FormEvent<HTMLFormElement>, ids: TypeIds) => {
        e.preventDefault();
        axios({
            baseURL: 'http://localhost:4000',
            method: 'delete',
            url: `/${ids.answer_id}/answer_delete`,
            headers: {
                Authorization: getLSUser().token
            }
        })
        // deleteAnswerAxios({
        //     user_id: getLSUser().user_id,
        //     quiz_id,
        //     question_id: ids.question_id,
        //     answer_id: ids.answer_id,
        // })
        //     .then((response: AxiosResponse) => {
        //         if (response.status === 200) {
        //
        //         }
        //     })
        //     .catch((error: AxiosError) => {
        //         console.log('error');
        //         return error;
        //     });
    };

    return (
        <ListGroupWrapper>
            {
                answersArr.map((answer: IAnswerData) => {
                    return (
                        <Fragment key={answer.answer_id}>
                            <ModalPopUp
                                idModal={nameModalIdAnswers.change + answer.answer_id}
                            >
                                <FormModal
                                    submitForm={(e) => submitFormAnswer(
                                        e,
                                        {
                                            answer_id: answer.answer_id,
                                            question_id: answer.question_id,
                                        },
                                    )}
                                    method='patch'
                                    sectionButtons={[
                                        <BtnPopUpCloseModal
                                            key='1'
                                            popUpTarget={nameModalIdAnswers.change + answer.answer_id}
                                            text='Изменить'
                                            type={'submit'}
                                            color={'yellow'}
                                        />,
                                        <BtnPopUpCloseModal
                                            key='2'
                                            popUpTarget={nameModalIdAnswers.change + answer.answer_id}
                                            text='Отмена'
                                            type={'button'}
                                            color={'red'}
                                        />,
                                    ]}
                                >
                                    <InputModal
                                        value={answerValueSelector}
                                        labelText='Введите новое имя вашего ответа'
                                        changeEvent={handlerChangeInput}
                                    />
                                </FormModal>
                            </ModalPopUp>
                            <ModalPopUp
                                idModal={nameModalIdAnswers.delete + answer.answer_id}
                            >
                                <FormModal
                                    submitForm={(e) => submitFormDeleteAnswer(e, {
                                        answer_id: answer.answer_id,
                                        question_id: answer.question_id,
                                    })}
                                    sectionButtons={[
                                        <BtnPopUpCloseModal
                                            key='1'
                                            popUpTarget={nameModalIdAnswers.delete + answer.answer_id}
                                            text='Удалить'
                                            type='submit'
                                            color='yellow'
                                        />,
                                        <BtnPopUpCloseModal
                                            key='2'
                                            popUpTarget={nameModalIdAnswers.delete + answer.answer_id}
                                            text='Отмена'
                                            type='button'
                                            color='red'
                                        />,
                                    ]}
                                >
                                    <span>Вы действительно хотите удалить данный ответ?</span>
                                </FormModal>
                            </ModalPopUp>
                            <ListGroupBody
                                key={answer.answer_id}
                                text={answer.answer_name}
                            >
                                <BtnPopUpOpenModal
                                    id={answer.answer_id}
                                    idPopUpTarget={nameModalIdAnswers.change + answer.answer_id}
                                    text='Изменить'
                                    color='yellow'
                                    type='button'
                                />
                                <BtnPopUpOpenModal
                                    idPopUpTarget={nameModalIdAnswers.delete + answer.answer_id}
                                    text='Удалить'
                                    color='red'
                                    type='button'
                                />
                            </ListGroupBody>
                        </Fragment>
                    );
                })
            }
        </ListGroupWrapper>
    );
};

export default AnswersPage;