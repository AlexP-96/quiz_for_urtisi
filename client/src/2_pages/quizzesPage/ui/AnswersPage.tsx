import React, {
    FC,
    FormEvent,
    Fragment,
    useEffect,
    useTransition,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { AppDispatch } from '../../../1_app/providers/redux/store/store';
import {
    answersValueUserReducer,
} from '../../../4_entities/templateSlice';
import {
    deleteAnswer,
    updateAnswer,
} from '../../../4_entities/templateSlice/asyncThunks/QuizAsyncThunk';
import {
    SelectorUserAnswers,
} from '../../../4_entities/templateSlice/model/selectors';
import { IAnswer } from '../../../4_entities/templateSlice/slice/userSlice';
import { BtnPopUpCloseModal } from '../../../6_shared/ui/Buttons';
import BtnPopUpOpenModal from '../../../6_shared/ui/Buttons/ui/BtnPopUpOpenModal';
import { FormModal } from '../../../6_shared/ui/Forms';
import InputModal from '../../../6_shared/ui/Inputs/ui/InputModal';
import {
    ListGroupBody,
    ListGroupWrapper,
} from '../../../6_shared/ui/ListGroup';
import ModalPopUp from '../../../6_shared/ui/Modals/ui/ModalPopUp';

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
    answersArr: IAnswer[];
}

const AnswersPage: FC<PropsAnswersList> = (props) => {
    const { answersArr } = props;

    const answerValueSelector = useSelector(SelectorUserAnswers);

    const dispatch = useDispatch<AppDispatch>();

    const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(answersValueUserReducer(e.target.value));
    };

    const submitUpdateFormAnswer = (e: FormEvent<HTMLFormElement>, ids: TypeIds) => {
        e.preventDefault();
        dispatch(updateAnswer({
            answer_id: ids.answer_id,
            post_data: answerValueSelector,
        }));

    };

    useEffect(() => {

    }, []);

    const submitFormDeleteAnswer = (e: FormEvent<HTMLFormElement>, ids: TypeIds) => {
        e.preventDefault();
        dispatch(deleteAnswer({ answer_id: ids.answer_id }));
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
                                    submitForm={(e) => submitUpdateFormAnswer(
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