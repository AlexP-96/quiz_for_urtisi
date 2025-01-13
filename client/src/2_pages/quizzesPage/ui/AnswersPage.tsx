import React, {
    FC,
    FormEvent,
    Fragment,
    useState,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { answersUser } from '../../../4_entities/templateSlice';
import { SelectorUserAnswers } from '../../../4_entities/templateSlice/model/selectors';
import { BtnPopUpCloseModal } from '../../../6_shared/ui/Buttons';
import BtnPopUpOpenModal from '../../../6_shared/ui/Buttons/ui/BtnPopUpOpenModal';
import { FormModal } from '../../../6_shared/ui/Forms';
import InputModal from '../../../6_shared/ui/Inputs/ui/InputModal';
import {
    ListGroupBody,
    ListGroupWrapper,
} from '../../../6_shared/ui/ListGroup';
import PopUpModal from '../../../6_shared/ui/Modals/ui/PopUpModal';

enum nameModalIdAnswers {
    change = 'modal-change-answer-',
    delete = 'modal-delete-answer-'
}

interface IAnswerData {
    answer_name: string;
    answer_id: number;
    type: string;
}

interface PropsAnswersList {
    answersArr: IAnswerData[];
}

const AnswersPage: FC<PropsAnswersList> = (props) => {
    const { answersArr } = props;

    const [answerId, setAnswerId] = useState<number>(null);

    const answerValueSelector = useSelector(SelectorUserAnswers);

    const dispatch = useDispatch();

    const handlerClick = (id: number) => {
        setAnswerId(id);
    };

    const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(answersUser(e.target.value));
    };

    const submitFormAnswer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(answersUser(''));
    };

    const submitFormDeleteAnswer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <ListGroupWrapper>
            {
                answersArr.map((answer: IAnswerData) => {
                    return (
                        <Fragment key={answer.answer_id}>
                            <PopUpModal
                                idModal={nameModalIdAnswers.change + answer.answer_id}
                            >
                                <FormModal
                                    submitForm={submitFormAnswer}
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
                            </PopUpModal>
                            <PopUpModal
                                idModal={nameModalIdAnswers.delete + answer.answer_id}
                            >
                                <FormModal
                                    submitForm={submitFormDeleteAnswer}
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
                            </PopUpModal>
                            <ListGroupBody
                                key={answer.answer_id}
                                text={answer.answer_name}
                            >
                                <BtnPopUpOpenModal
                                    handlerClick={handlerClick}
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