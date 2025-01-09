import React, {
    useEffect,
    useState,
} from 'react';
import { Simulate } from 'react-dom/test-utils';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    AppDispatch,
    RootState,
} from '1_app/providers/redux/store/store';
import {
    arrQuizDb,
    closeModal,
    emailUser,
    isLoading,
    quizUserName,
    userId,
} from '4_entities/templateSlice';
import {
    SelectorUserArrQuizzes,
    SelectorUserId,
    SelectorUserLoad,
    SelectorUserQuiz,
} from '4_entities/templateSlice/model/selectors';
import {
    axiosAuthPostData,
    axiosGetData,
} from '6_shared/api/axiosRequests';
import FormCreate from '../../../6_shared/ui/FormCreateQuiz/ui/FormCreate';
import { Modal } from '../../../6_shared/ui/Modal';
import QuizView from '../../../6_shared/ui/QuizzesView/ui/QuizView';
import { Spinner } from '../../../6_shared/ui/Spinner';
import { FirstQuiz } from '../../firstQuizPage';
import { ThunkAction } from 'redux-thunk';
import { UnknownAction } from '@reduxjs/toolkit';
import { Button } from '@headlessui/react';
import { errorUser } from '4_entities/templateSlice/slice/userSlice';
import {
    AxiosError,
    AxiosResponse,
} from 'axios';
import error = Simulate.error;

const QuizListPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const [isVisibleModal, setIsVisibleModal] = useState(false);

    const nameQuizSelector = useSelector(SelectorUserQuiz);
    const userIdSelector = useSelector(SelectorUserId);
    const quizDataSelector = useSelector(SelectorUserArrQuizzes);
    const loadDataSelector = useSelector(SelectorUserLoad);

    const navigate = useNavigate();

    const getAllQuiz = () => {
        axiosGetData(
            `/${JSON.parse(localStorage.getItem('data_user')).user_id}/quiz_all`,
            () => dispatch(isLoading(true)),
        ).then((response: AxiosResponse) => {
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
        }).catch(error => {
            console.log('error', error);
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
            dispatch(isLoading(false));
        });
    };

    const submitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axiosAuthPostData(`/${userIdSelector}/create_quiz`, { quiz_name: nameQuizSelector })
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    getAllQuiz();
                    console.log('Был успешный запрос на создание нового квиза', response);
                }
                if (response.status === 403) {
                    navigate('/login');
                    console.log('Был успешный запрос на создание нового квиза', response);
                }
            })
            .catch((error: AxiosError) => {
                console.log(error);
            });

        dispatch(quizUserName(''));
        setIsVisibleModal(false);
    };

    const handlerLogout = () => {
        setIsVisibleModal(true);
    };

    useEffect(() => {
        getAllQuiz();
    }, []);

    return (
        <>
            {
                loadDataSelector
                    ? <Spinner />
                    :
                    <>
                        {
                            quizDataSelector.length > 0 && (
                                <>
                                    {
                                        <>
                                            <QuizView quizList={quizDataSelector} />
                                            <div
                                                className='mx-auto flex flex-wrap gap-2 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'
                                            >
                                                <Button
                                                    onClick={handlerLogout}
                                                    className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                >
                                                    Создать новый квиз
                                                </Button>
                                            </div>
                                        </>
                                    }
                                </>
                            )
                        }
                        <Modal
                            visible={isVisibleModal}
                            handlerClose={() => setIsVisibleModal(false)}
                        >
                            <FormCreate
                                title='Введите название вашего Квиза'
                                valueInput={nameQuizSelector}
                                submitForm={submitData}
                                dispatchInput={(e) => dispatch(quizUserName(e.target.value))}
                            />
                        </Modal>
                        {
                            quizDataSelector.length === 0 && (
                                <FirstQuiz />
                            )
                        }
                    </>
            }
        </>
    );
};

export default QuizListPage;