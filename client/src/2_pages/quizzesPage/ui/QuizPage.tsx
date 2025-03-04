import React, {
    ChangeEvent,
    FC,
    useEffect,
    useState,
} from 'react';
import {
    useNavigate,
    useParams,
} from 'react-router-dom';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    SelectorUserArrQuestions,
    SelectorUserArrQuizzes,
    SelectorUserQuestions,
} from '4_entities/templateSlice/model/selectors';
import {
    isLoadingReducer,
    questionValueUserReducer,
} from '4_entities/templateSlice';
import { AppDispatch } from '../../../1_app/providers/redux/store/store';
import {
    createQuestion,
    fetchQuizzesAll,
} from '../../../4_entities/templateSlice/asyncThunks/QuizAsyncThunk';
import {
    getLSUser,
} from '../../../6_shared/lib/helpers/localStorage/localStorage';
import {
    BtnPopUpCloseModal,
    ButtonOpenModal,
} from '../../../6_shared/ui/Buttons';
import BtnPopUpOpenModal from '../../../6_shared/ui/Buttons/ui/BtnPopUpOpenModal';
import { FormModal } from '../../../6_shared/ui/Forms';
import { InputModal } from '../../../6_shared/ui/Inputs';
import { ModalPopUpTailwind } from '../../../6_shared/ui/Modals';

import ModalPopUp from '../../../6_shared/ui/Modals/ui/ModalPopUp';
import QuestionsPage from './QuestionsPage';

interface IQuizId {
    quiz_id: number;
}

interface IQuizData {
    questions: [];
    quiz_id: number | string;
    quiz_name: string;
}

interface IQuestionData {
    question_name: string;
    question_id: number;
    answers: [];
}

interface IAnswerData {
    answer_name: string;
    answer_id: number;
    type: string;
}

//todo сделать нормальные нейминги компонентов
const QuizPage: FC = () => {
    const { quiz_id } = useParams();

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const quizzesDataSelector = useSelector(SelectorUserArrQuizzes);
    const questionDataSelector = useSelector(SelectorUserArrQuestions);

    const dispatch = useDispatch<AppDispatch>();

    let quizName = '';

    const questionTextSelector = useSelector(SelectorUserQuestions);

    if (quizzesDataSelector.length) {
        quizzesDataSelector.filter((quiz) => {
            const { quiz_name } = quiz;

            if (quiz.quiz_id === Number(quiz_id)) {
                quizName = quiz_name;
                return quiz_name;
            }
        });
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createQuestion({
            user_id: getLSUser().user_id,
            quiz_id: Number(quiz_id),
            post_data: questionTextSelector,
        }));
    };

    const changeInputQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(questionValueUserReducer(e.target.value));
    };

    useEffect(() => {
        dispatch(fetchQuizzesAll(getLSUser().user_id));
    }, []);

    return (
        <div className='mx-auto flex flex-wrap gap-2 max-w-2xl px-4 py-16 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8'>
            <div
                className='mx-auto w-full'
            >
                <ModalPopUpTailwind
                    onCloseModal={() => setIsOpenModal(false)}
                    isVisible={isOpenModal}
                    textBtnCancel='Отмена'
                    textBtnAccess='Добавить'
                    title='Введите название нового вопроса'
                    submitForm={submitForm}
                >
                    <InputModal
                        value={questionTextSelector}
                        changeEvent={changeInputQuestion}
                    />
                </ModalPopUpTailwind>
                <h2 className='pb-10 font-extrabold'>{}</h2>
                {
                    questionDataSelector.length === 0
                        ?
                        <div
                            className='mx-auto flex flex-wrap gap-2 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'
                        >
                            Вопросов нет, создайте первый
                        </div>
                        : null
                }

                <QuestionsPage
                    quizName={quizName}
                />

                <ButtonOpenModal
                    text='Добавить вопрос'
                    className='mt-10'
                    onOpenModal={() => setIsOpenModal(true)}
                />
            </div>
        </div>
    );
};

export default QuizPage;