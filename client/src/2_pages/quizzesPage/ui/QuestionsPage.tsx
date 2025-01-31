import React, {
    ChangeEvent,
    FC,
    FormEvent,
    Fragment,
    useEffect,
    useState,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../1_app/providers/redux/store/store';
import {
    answersValueUserReducer,
} from '../../../4_entities/templateSlice';
import { createAnswer } from '../../../4_entities/templateSlice/asyncThunks/QuizAsyncThunk';
import {
    SelectorUserAnswers,
    SelectorUserArrAnswers,
    SelectorUserArrQuestions,
    SelectorUserArrQuizzes,
} from '../../../4_entities/templateSlice/model/selectors';
import { getLSUser } from '../../../6_shared/lib/helpers/localStorage/localStorage';
import {
    Accordion,
} from '6_shared/ui/Accordion';
import {
    BtnPopUpCloseModal,
    ButtonOpenModal,
} from '../../../6_shared/ui/Buttons';
import BtnPopUpOpenModal from '../../../6_shared/ui/Buttons/ui/BtnPopUpOpenModal';
import { FormModal } from '../../../6_shared/ui/Forms';
import { InputModal } from '../../../6_shared/ui/Inputs';
import { ModalPopUpTailwind } from '../../../6_shared/ui/Modals';
import ModalPopUp from '../../../6_shared/ui/Modals/ui/ModalPopUp';
import AnswersPage from './AnswersPage';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface IQuestionData {
    questionName: any;
}

const QuestionsPage: FC<IQuestionData> = ({ questionName }) => {
    const params = useParams();
    console.log('questionName', questionName);
    const answerValueSelector = useSelector(SelectorUserAnswers);
    const questionsDataSelector = useSelector(SelectorUserArrQuestions);
    const answersDataSelector = useSelector(SelectorUserArrAnswers);

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [questionId, setQuestionId] = useState<number | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const handlerChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(answersValueUserReducer(e.target.value));
    };

    const handlerCloseModal = () => {

    };

    const handlerClickButton = (question_id: number) => {
        setIsOpenModal(true);
        setQuestionId(question_id);
        console.log(question_id);
    };

    useEffect(() => {

    }, [questionName]);

    const submitForm = (e: FormEvent<HTMLFormElement>, questionID: number) => {
        e.preventDefault();
        dispatch(createAnswer({
            user_id: getLSUser().user_id,
            quiz_id: Number(params.quiz_id),
            question_id: questionID,
            post_data: answerValueSelector,
        }));
    };

    return (
        <>
            <div>
                <ModalPopUpTailwind
                    isVisible={isOpenModal}
                    onCloseModal={() => setIsOpenModal(false)}
                    title='Введите название вопроса'
                    textBtnCancel='Отмена'
                    textBtnAccess='Создать вопрос'
                >
                    <InputModal
                        value={answerValueSelector}
                        changeEvent={handlerChangeInput}
                    />
                </ModalPopUpTailwind>
                <div className='px-4 sm:px-0'>
                    <h3 className='text-base/7 font-semibold text-gray-900'>{questionName.quiz_name}</h3>
                </div>
                {questionsDataSelector.filter(question => question.quiz_id === Number(params.quiz_id))
                    .map((question) => {
                        return (
                            <div
                                className='mt-5 border-t border-gray-100'
                                key={question.question_id}
                            >
                                <dl className='divide-y m-2 divide-gray-100'>
                                    <h4 className='mt-1 py-5 max-w-2xl text-sm/6 font-extrabold text-gray-800'>
                                        {question.question_name}
                                    </h4>
                                    <div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                                        <dd className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
                                            Секция для названия вопросов
                                        </dd>
                                        <dt className='text-sm/6 font-medium text-gray-900'>Секция для кнопок</dt>
                                    </div>
                                    <div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                                        <dd className='mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
                                            <ButtonOpenModal
                                                text='Создать ответ'
                                                onOpenModal={() => handlerClickButton(question.question_id)}
                                            />
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        );
                    })}
            </div>
            <Accordion>
                {
                    questionsDataSelector.filter(question => question.quiz_id === Number(params.quiz_id))
                        .map((question) => {
                            return (
                                <Fragment key={question.question_id}>
                                    <Accordion.Body
                                        id={question.question_id}
                                        key={question.question_id}
                                        title={question.question_name}
                                    >
                                        <AnswersPage
                                            answersArr={answersDataSelector.filter(answer => answer.question_id == question.question_id)}
                                        />
                                    </Accordion.Body>

                                    <ModalPopUp
                                        idModal={question.question_name + question.question_id}
                                        onClick={handlerCloseModal}
                                    >
                                        <FormModal
                                            submitForm={(e) => submitForm(e, question.question_id)}
                                            method='post'
                                            sectionButtons={[
                                                <BtnPopUpCloseModal
                                                    key='1'
                                                    popUpTarget={question.question_name + question.question_id}
                                                    text='Создать'
                                                    type='submit'
                                                    color={'green'}
                                                />,
                                                <BtnPopUpCloseModal
                                                    key='2'
                                                    popUpTarget={question.question_name + question.question_id}
                                                    text='Отмена'
                                                    type='button'
                                                    color={'red'}
                                                    onClick={handlerCloseModal}
                                                />,
                                            ]}
                                        >
                                            <InputModal
                                                labelText='Введите название вашего ответа'
                                                value={answerValueSelector}
                                                changeEvent={handlerChangeInput}
                                            />
                                        </FormModal>
                                    </ModalPopUp>
                                    <BtnPopUpOpenModal
                                        idPopUpTarget={question.question_name + question.question_id}
                                        text='Создать ответ'
                                        type='submit'
                                        color='green'
                                    />
                                </Fragment>
                            );
                        })
                }
            </Accordion>
        </>
    );
};

export default QuestionsPage;