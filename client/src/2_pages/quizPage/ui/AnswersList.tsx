import React, {
    FC,
    FormEvent,
    Fragment,
    SyntheticEvent,
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
import InputDefault from '../../../6_shared/ui/Inputs/ui/InputDefault';
import {
    ListGroupBody,
    ListGroupWrapper,
} from '../../../6_shared/ui/ListGroup';
import PopUpModal from '../../../6_shared/ui/Modals/ui/PopUpModal';
import loginPage from '../../loginPage/ui/LoginPage';

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

const AnswersList: FC<PropsAnswersList> = (props) => {
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

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(answersUser(''));
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
                                    submitForm={submitForm}
                                >
                                    <InputDefault
                                        value={answerValueSelector}
                                        text='Введите новое имя вашего ответа'
                                        changeEvent={handlerChangeInput}
                                    />
                                    <div className='justify-between'>
                                        <BtnPopUpCloseModal
                                            popUpTarget={nameModalIdAnswers.change + answer.answer_id}
                                            text='Изменить'
                                            type={'submit'}
                                            color={'yellow'}
                                        />
                                        <BtnPopUpCloseModal
                                            popUpTarget={nameModalIdAnswers.change + answer.answer_id}
                                            text='Отмена'
                                            type={'button'}
                                            color={'red'}
                                        />
                                    </div>
                                </FormModal>
                            </PopUpModal>
                            <PopUpModal
                                idModal={nameModalIdAnswers.delete + answer.answer_id}
                            >
                                Вы действительно хотите удалить данный ответ?
                            </PopUpModal>
                            <ListGroupBody
                                key={answer.answer_id}
                                text={answer.answer_name}
                            />
                            <BtnPopUpOpenModal
                                handlerClick={handlerClick}
                                id={answer.answer_id}
                                idPopUpTarget={nameModalIdAnswers.change + answer.answer_id}
                                text='Изменить'
                                color={'yellow'}
                                type='button'
                            />
                            <BtnPopUpOpenModal
                                idPopUpTarget={nameModalIdAnswers.delete + answer.answer_id}
                                text='Удалить'
                                color={'red'}
                                type='button'
                            />
                        </Fragment>
                    );
                })
            }
        </ListGroupWrapper>
    );
};

export default AnswersList;