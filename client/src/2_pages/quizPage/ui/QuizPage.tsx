import React, {
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
import { Modal } from '6_shared/ui/Modals';
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
    answersUser,
    arrQuizDb,
    emailUser,
    isLoading,
    questionUserName,
    userId,
} from '4_entities/templateSlice';
import { errorUser } from '4_entities/templateSlice/slice/userSlice';
import {
    getLSUser,
    setLSUserNull,
} from '../../../6_shared/lib/helpers/localStorage/localStorage';
import {
    AccordionBody,
    AccordionWrapper,
} from '../../../6_shared/ui/Accordion';
import {
    ListGroupBody,
    ListGroupWrapper,
} from '../../../6_shared/ui/ListGroup';
import QuestionsList from './QuestionsList';

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

    const [isVisibleModalQuestion, setIsVisibleModalQuestion] = useState(false);
    const [isVisibleModalAnswer, setIsVisibleModalAnswer] = useState(false);
    const [questionId, setQuestionId] = useState<null | number>(null);

    const dispatch = useDispatch();

    const quizDataSelector = useSelector(SelectorUserArrQuizzes);
    const userIdSelector = useSelector(SelectorUserId);
    const questionNameSelector = useSelector(SelectorUserQuestions);
    const answerNameSelector = useSelector(SelectorUserAnswers);

    const currentQuiz = quizDataSelector.filter((quiz: IQuizId) => quiz.quiz_id === Number(quiz_id));
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
    ///:user_id/quiz/:quiz_id/questions/:question_id/answer_create
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
                setIsVisibleModalQuestion(false);
            })
            .catch((error: AxiosError) => {
                dispatch(questionUserName(''));
                console.log('Клиентская ошибка', error);
            });
    };
    //todo обработать на сервере если пустой ответ

    const submitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axiosAuthPostData(
            `/${userIdSelector}/quiz/${quiz_id}/questions/${questionId}/answer_create`,
            { answer_name: answerNameSelector },
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
                setIsVisibleModalAnswer(false);
            })
            .catch((error: AxiosError) => {
                dispatch(questionUserName(''));
                console.log('Клиентская ошибка', error);
            });
    };

    const handlerCloseModal = () => {
        setIsVisibleModalQuestion(false);
        setIsVisibleModalAnswer(false);
        setQuestionId(null);
    };

    const openModalCreateQuestion = () => {
        setIsVisibleModalQuestion(true);
    };
    const openModalCreateAnswer = (childProps?: { questionId: number }) => {
        setIsVisibleModalAnswer(true);
        setQuestionId(childProps.questionId);
    };

    useEffect(() => {
        getAllQuiz();
    }, []);

    return (
        <div className='mx-auto flex flex-wrap gap-2 max-w-2xl px-4 py-16 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8'>
            <Modal
                visible={isVisibleModalQuestion || isVisibleModalAnswer}
                handlerClose={handlerCloseModal}
            >
                {isVisibleModalQuestion &&
                    <FormCreate
                        title='Введите ваш вопрос'
                        submitForm={submitQuestion}
                        valueInput={questionNameSelector}
                        dispatchInput={(e) => dispatch(questionUserName(e.target.value))}
                    />
                }
                {
                    isVisibleModalAnswer &&
                    <FormCreate
                        title='Введите ваш ответ'
                        submitForm={submitAnswer}
                        valueInput={answerNameSelector}
                        dispatchInput={(e) => dispatch(answersUser(e.target.value))}
                    />
                }
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
                                    onClick={openModalCreateQuestion}
                                >
                                    Вопросов нет, создайте первый</p>
                                : null
                        }
                        <QuestionsList
                            questionsArr={quiz.questions}
                            createAnswer={submitAnswer}
                        />;

                        {/*<AccordionWrapper>*/}
                        {/*    {quiz.questions.map((question: IQuestionData, index) => {*/}
                        {/*        return (*/}
                        {/*            <AccordionBody*/}
                        {/*                key={question.question_id}*/}
                        {/*                title={question.question_name}*/}
                        {/*                id={question.question_id}*/}
                        {/*                firstIndex={index}*/}
                        {/*                openModal={openModalCreateAnswer}*/}
                        {/*            >*/}
                        {/*                <ListGroupWrapper>*/}
                        {/*                    {question.answers.map((answer: IAnswerData) => {*/}
                        {/*                        return (*/}
                        {/*                            <ListGroupBody*/}
                        {/*                                key={answer.answer_id}*/}
                        {/*                                text={answer.answer_name}*/}
                        {/*                            />*/}
                        {/*                        );*/}
                        {/*                    })}*/}
                        {/*                </ListGroupWrapper>*/}
                        {/*            </AccordionBody>*/}
                        {/*        );*/}
                        {/*    })}*/}
                        {/*</AccordionWrapper>*/}
                        <button
                            onClick={openModalCreateQuestion}
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