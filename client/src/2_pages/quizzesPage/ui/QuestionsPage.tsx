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
import { AnswerSection } from '../../../6_shared/ui/Answers';
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
    quizName: string;
}

const QuestionsPage: FC<IQuestionData> = ({ quizName }) => {
    const params = useParams();

    const answerValueSelector = useSelector(SelectorUserAnswers);
    const questionsDataSelector = useSelector(SelectorUserArrQuestions);
    const answersDataSelector = useSelector(SelectorUserArrAnswers);

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isChangeQuestionModal, setIsChangeQuestionModal] = useState<boolean>(false);
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
    };

    const handlerChangeQuestion = (question_id: number) => {
        setIsChangeQuestionModal(true);
        setQuestionId(question_id);
    };

    useEffect(() => {

    }, []);

    const submitCreateNewAnswerForm = (e: FormEvent<HTMLFormElement>, questionID: number) => {
        e.preventDefault();
        dispatch(createAnswer({
            user_id: getLSUser().user_id,
            quiz_id: Number(params.quiz_id),
            question_id: questionID,
            post_data: answerValueSelector,
        }));
    };

    return (
        <Fragment>
            <ModalPopUpTailwind
                isVisible={isOpenModal}
                onCloseModal={() => setIsOpenModal(false)}
                title='Введите название нового ответа'
                textBtnCancel='Отмена'
                textBtnAccess='Создать ответ'
                submitForm={(e) => submitCreateNewAnswerForm(e, questionId)}
            >
                <InputModal
                    value={answerValueSelector}
                    changeEvent={handlerChangeInput}
                />
            </ModalPopUpTailwind>
            <ModalPopUpTailwind
                isVisible={isChangeQuestionModal}
                onCloseModal={() => setIsChangeQuestionModal(false)}
                title='Изменить название вопроса'
                textBtnCancel='Отмена'
                textBtnAccess='Изменить вопрос'
                submitForm={(e) => submitCreateNewAnswerForm(e, questionId)}
            >
                <InputModal
                    value={answerValueSelector}
                    changeEvent={handlerChangeInput}
                />
            </ModalPopUpTailwind>
            <div className='px-4 sm:px-0'>
                <h3 className='text-base/7 font-semibold text-gray-900'>{quizName}</h3>
            </div>
            {questionsDataSelector.filter(question => question.quiz_id === Number(params.quiz_id))
                .map((question) => {
                    return (
                        <div
                            className='mt-5 border-t border-gray-100 bg-blue-50 rounded-xl'
                            key={question.question_id}
                        >
                            <dl className='divide-y divide-gray-100'>
                                <div className='flex'>
                                    <h4 className='py-5 text-sm/6 font-extrabold pl-5 text-gray-800 w-full bg-green-100 rounded-xl'>
                                        {question.question_name}
                                    </h4>
                                    <ButtonOpenModal
                                        text='Изменить вопрос'
                                        backgroundColor='green'
                                        textColor='yellow'
                                        onOpenModal={() => handlerChangeQuestion(question.question_id)}
                                    />
                                </div>
                                {
                                    <AnswerSection answerArr={answersDataSelector.filter(answer => answer.question_id == question.question_id)} />
                                }
                                <div className='px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                                    <dd className='mt-1 pl-5 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0'>
                                        <ButtonOpenModal
                                            text='Создать ответ'
                                            backgroundColor='green'
                                            textColor='yellow'
                                            onOpenModal={() => handlerClickButton(question.question_id)}
                                        />
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    );
                })}
        </Fragment>
    );
};

export default QuestionsPage;