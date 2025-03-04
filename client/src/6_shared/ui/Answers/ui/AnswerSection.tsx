import React, {
    ChangeEvent,
    FC,
    FormEvent,
    Fragment,
    useState,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { AppDispatch } from '../../../../1_app/providers/redux/store/store';
import {
    deleteAnswer,
    updateAnswer,
} from '../../../../4_entities/templateSlice/asyncThunks/QuizAsyncThunk';
import {
    SelectorUserAnswers,
    SelectorUserArrQuestions,
    SelectorUserQuestions,
} from '../../../../4_entities/templateSlice/model/selectors';
import {
    answersValueUserReducer,
    IAnswer,
} from '../../../../4_entities/templateSlice/slice/userSlice';
import { ButtonOpenModal } from '../../Buttons';
import { InputModal } from '../../Inputs';
import { ModalPopUpTailwind } from '../../Modals';

interface PropsAnswerSection {
    answerArr: IAnswer[];
}

const AnswerSection: FC<PropsAnswerSection> = (props) => {
    const { answerArr } = props;

    const dispatch = useDispatch<AppDispatch>();

    const answerValueSelector = useSelector(SelectorUserAnswers);

    const [isVisibleModalDelete, setIsVisibleModalDelete] = useState<boolean>(false);
    const [isVisibleModalUpdate, setIsVisibleModalUpdate] = useState<boolean>(false);
    const [currentNameAnswer, setCurrentNameAnswer] = useState<string | null>(null);
    const [idAnswer, setIdAnswer] = useState<number | null>(null);

    const handlerChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(answersValueUserReducer(e.target.value));
    };

    const handlerDeleteAnswer = (answer_id: number, name_answer: string) => {
        setIsVisibleModalDelete(true);
        setIdAnswer(answer_id);
        setCurrentNameAnswer(name_answer);
    };

    const handlerUpdateAnswer = (answer_id: number) => {
        setIsVisibleModalUpdate(true);
        setIdAnswer(answer_id);
    };

    const submitUpdateAnswer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateAnswer({
            answer_id: idAnswer,
            post_data: answerValueSelector,
        }));
    };
    const submitDeleteAnswer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(deleteAnswer({ answer_id: idAnswer }));
    };

    return (
        <Fragment>
            <ModalPopUpTailwind
                isVisible={isVisibleModalUpdate}
                onCloseModal={() => setIsVisibleModalUpdate(false)}
                textBtnCancel='Отмена'
                textBtnAccess='Изменить'
                title='Введите новое имя для отaвета'
                submitForm={submitUpdateAnswer}
            >
                <InputModal
                    value={answerValueSelector}
                    changeEvent={handlerChangeInput}
                />
            </ModalPopUpTailwind>
            <ModalPopUpTailwind
                title={`Вы действительно хотите удалить данный ответ - ${currentNameAnswer}?`}
                isVisible={isVisibleModalDelete}
                textBtnAccess='Удалить'
                textBtnCancel='Отмена'
                onCloseModal={() => setIsVisibleModalDelete(false)}
                submitForm={submitDeleteAnswer}
            />
            {
                answerArr.map((answer, index, arr) => {
                    return (
                        <Fragment key={answer.answer_id}>
                            <div
                                className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'
                            >
                                <div className='text-sm/6 pl-10 text-gray-700 sm:col-span-2 sm:mt-0'>
                                    {answer.answer_name}
                                </div>
                                <dt className='text-sm/6 font-medium  pr-5 text-gray-900 flex flex-row-reverse space-x-4 space-x-reverse'>
                                    <ButtonOpenModal
                                        text='Изменить'
                                        backgroundColor='yellow'
                                        textColor='black'
                                        onOpenModal={() => handlerUpdateAnswer(answer.answer_id)}
                                    />
                                    <ButtonOpenModal
                                        text='Удалить'
                                        backgroundColor='red'
                                        textColor='red'
                                        onOpenModal={() => handlerDeleteAnswer(answer.answer_id, answer.answer_name)}
                                    />
                                </dt>
                            </div>
                            <hr />
                        </Fragment>
                    );
                })
            }
        </Fragment>
    );
};

export default AnswerSection;