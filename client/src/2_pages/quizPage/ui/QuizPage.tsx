import React, {
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
    SelectorUserArrQuizzes,
    SelectorUserId,
    SelectorUserQuestions,
} from '4_entities/templateSlice/model/selectors';
import { Modal } from '6_shared/ui/Modal';
import {
    axiosAuthPostData,
    axiosGetData,
} from '6_shared/api/axiosRequests';
import {
    AxiosError,
    AxiosResponse,
} from 'axios';
import FormCreate from '6_shared/ui/FormCreateQuiz/ui/FormCreate';
import {
    arrQuizDb,
    emailUser,
    isLoading,
    questionUserName,
    userId,
} from '4_entities/templateSlice';
import { errorUser } from '4_entities/templateSlice/slice/userSlice';
import {
    Accordion,
    AccordionWrapper,
} from '../../../6_shared/ui/Accordion';
import {
    ListGroupBody,
    ListGroupWrapper,
} from '../../../6_shared/ui/ListGroup';

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

const QuizPage = () => {
    const { quiz_id } = useParams();

    const navigate = useNavigate();

    const [isVisibleModal, setIsVisibleModal] = useState(false);

    const dispatch = useDispatch();

    const quizDataSelector = useSelector(SelectorUserArrQuizzes);
    const userIdSelector = useSelector(SelectorUserId);
    const questionNameSelector = useSelector(SelectorUserQuestions);

    const currentQuiz = quizDataSelector.filter((quiz: IQuizId) => quiz.quiz_id === Number(quiz_id));

    //todo сделать одновление данных в локальном хранилище отдельной функцией
    const getAllQuiz = () => {
        axiosGetData(`/${JSON.parse(localStorage.getItem('data_user')).user_id}/quiz_all`, () => {
            dispatch(isLoading(true));
        })
            .then((response: AxiosResponse) => {
                dispatch(isLoading(false));

                if (response.status === 403) {
                    dispatch(errorUser(response.data.response.data));
                    localStorage.setItem(
                        'data_user',
                        JSON.stringify({
                            user_id: '',
                            email: '',
                            token: '',
                        }),
                    );
                    dispatch(userId(''));
                    dispatch(emailUser(''));
                    navigate('/login');
                    return;
                }

                dispatch(arrQuizDb(response.data.data));
            })
            .catch((error: AxiosError) => {
                console.log('errorQUiz_PAge', error);
                navigate('/login');
            });
    };

    const submitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axiosAuthPostData(
            `/${userIdSelector}/questions/${quiz_id}/question_create`,
            { question_name: questionNameSelector },
        )
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    getAllQuiz();
                }
                if (response.status === 403) {
                    navigate('/login');
                    console.log('Был успешный запрос на создание новго квиза', response);
                }
                dispatch(questionUserName(''));
                setIsVisibleModal(false);
            })
            .catch((error: AxiosError) => {
                dispatch(questionUserName(''));
                console.log('Клиентская ошибка', error);
            });
    };

    useEffect(() => {
        if (quizDataSelector.length === 0) {
            getAllQuiz();
        }
    }, []);

    return (
        <div className='mx-auto flex flex-wrap gap-2 max-w-2xl px-4 py-16 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8'>
            <Modal
                visible={isVisibleModal}
                handlerClose={() => setIsVisibleModal(false)}
            >
                <FormCreate
                    title='Введите ваш вопрос'
                    submitForm={submitQuestion}
                    valueInput={questionNameSelector}
                    dispatchInput={(e) => dispatch(questionUserName(e.target.value))}
                />
            </Modal>
            {
                currentQuiz.map((quiz: IQuizData) => {

                    return (<div
                        className='mx-auto w-full'
                        key={quiz.quiz_id}
                    >
                        <h2 className='pb-10 font-extrabold'>{quiz.quiz_name}</h2>
                        {
                            quiz.questions.length === 0
                                ? <p
                                    onClick={() => setIsVisibleModal(true)}
                                >
                                    Вопросов нет, создайте первый</p>
                                : null
                        }
                        <AccordionWrapper>
                            {quiz.questions.map((question: IQuestionData) => {
                                return (
                                    <Accordion
                                        key={question.question_id}
                                        title={question.question_name}
                                        id={question.question_id}
                                    >
                                        {question.answers.map((answer: IAnswerData) => {

                                            return (
                                                <ListGroupWrapper key={answer.answer_id}>
                                                    <ListGroupBody title={answer.answer_name}/>
                                                </ListGroupWrapper>
                                            )
                                                ;
                                        })}
                                    </Accordion>
                                );
                            })}
                        </AccordionWrapper>
                        <button
                            onClick={() => setIsVisibleModal(true)}
                            className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >Добавить вопрос
                        </button>
                    </div>);
                })
            }
        </div>
    );
};

export default QuizPage;