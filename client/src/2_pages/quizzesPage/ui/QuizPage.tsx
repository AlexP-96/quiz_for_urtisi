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
    SelectorUserAnswers,
    SelectorUserArrQuizzes,
    SelectorUserId,
    SelectorUserQuestions,
} from '4_entities/templateSlice/model/selectors';
import {
    axiosAuthPostData,
    axiosGetData,
    createAnswerAxios,
    createQuizAxios,
} from '6_shared/api/axiosRequests';
import {
    AxiosError,
    AxiosResponse,
} from 'axios';
import {
    answersUser,
    arrQuizDb,
    emailUser,
    isLoading,
    questionUserText,
    userId,
} from '4_entities/templateSlice';
import { errorUser } from '4_entities/templateSlice/slice/userSlice';
import {
    getLSUser,
    setLSUserNull,
} from '../../../6_shared/lib/helpers/localStorage/localStorage';
import { BtnPopUpCloseModal } from '../../../6_shared/ui/Buttons';
import BtnPopUpOpenModal from '../../../6_shared/ui/Buttons/ui/BtnPopUpOpenModal';
import { FormModal } from '../../../6_shared/ui/Forms';
import { InputModal } from '../../../6_shared/ui/Inputs';

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

const QuizPage: FC = () => {
    const { quiz_id } = useParams();

    const navigate = useNavigate();

    const [questionId, setQuestionId] = useState<null | number>(null);

    const dispatch = useDispatch();

    const quizDataSelector = useSelector(SelectorUserArrQuizzes);
    const userIdSelector = useSelector(SelectorUserId);
    const questionTextSelector = useSelector(SelectorUserQuestions);
    const answerNameSelector = useSelector(SelectorUserAnswers);

    const currentQuiz = quizDataSelector.filter((quiz: IQuizId) => quiz.quiz_id === Number(quiz_id));
    console.log(currentQuiz[0]);

    //todo сделать обновление данных в локальном хранилище отдельной функцией
    const getAllQuiz = () => {
        console.log(`/${getLSUser().user_id}/quiz_all`);
        axiosGetData(`/${getLSUser().user_id}/quiz_all`, () => {
            dispatch(isLoading(true));
        })
            .then((response: AxiosResponse) => {
                dispatch(isLoading(false));

                if (response.status === 403) {
                    dispatch(errorUser(response.data.response.data));
                    setLSUserNull();
                    dispatch(userId(''));
                    dispatch(emailUser(''));
                    navigate('/login');
                    return;
                }

                dispatch(arrQuizDb(response.data.data));
            })
            .catch((error: AxiosError) => {
                console.log('errorQuiz_PAge', error);
                navigate('/login');
            });
    };

    const submitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axiosAuthPostData(
            `/${userIdSelector}/questions/${quiz_id}/question_create`,
            { question_name: questionTextSelector },
        )
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    getAllQuiz();
                }
                if (response.status === 403) {
                    navigate('/login');
                    console.log('Был успешный запрос на создание новго квиза', response);
                }
                dispatch(questionUserText(''));
            })
            .catch((error: AxiosError) => {
                dispatch(questionUserText(''));
                console.log('Клиентская ошибка', error);
            });
    };

    //todo обработать на сервере если пустой ответ

    const submitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createAnswerAxios({
            user_id: getLSUser().user_id,
            quiz_id: quiz_id,
            question_id: questionId,
            postData: answerNameSelector,
        }, () => dispatch(isLoading(true)))
            .then((response: AxiosResponse) => {

            })
            .catch((error: AxiosError) => {

            });
    };

    const changeInputQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(questionUserText(e.target.value));
    };

    const handlerCloseModal = () => {
        setQuestionId(null);
    };

    const openModalCreateQuestion = () => {
    };
    const openModalCreateAnswer = (childProps?: { questionId: number }) => {
        setQuestionId(childProps.questionId);
    };

    useEffect(() => {
        getAllQuiz();
    }, []);

    return (
        <div className='mx-auto flex flex-wrap gap-2 max-w-2xl px-4 py-16 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8'>
            {
                currentQuiz.map((quiz: IQuizData) => {
                    return (
                        <div
                            className='mx-auto w-full'
                            key={quiz.quiz_id}
                        >
                            <ModalPopUp
                                idModal={'first-question'}
                            >
                                <FormModal
                                    submitForm={submitAnswer}
                                    sectionButtons={[
                                        <BtnPopUpCloseModal
                                            key='1'
                                            popUpTarget='first-question'
                                            text='Создать'
                                            type='submit'
                                            color='green'
                                        />,
                                        <BtnPopUpCloseModal
                                            key='2'
                                            popUpTarget='first-question'
                                            text='Отмена'
                                            type='button'
                                            color='red'
                                        />,
                                    ]}
                                >
                                    <InputModal
                                        labelText='Введите название первого вопроса'
                                        value={questionTextSelector}
                                        changeEvent={changeInputQuestion}
                                    />
                                </FormModal>
                            </ModalPopUp>
                            <h2 className='pb-10 font-extrabold'>{quiz.quiz_name}</h2>
                            {
                                quiz.questions.length === 0
                                    ?
                                    <div
                                        className='mx-auto flex flex-wrap gap-2 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'
                                    >
                                        Вопросов нет, создайте первый
                                    </div>
                                    : null
                            }
                            <QuestionsPage
                                questionsArr={quiz.questions}
                                createAnswer={submitAnswer}
                            />
                            <BtnPopUpOpenModal
                                idPopUpTarget='first-question'
                                text='Добавить вопрос'
                                type='button'
                            />
                        </div>);
                })
            }
        </div>
    );
};

export default QuizPage;