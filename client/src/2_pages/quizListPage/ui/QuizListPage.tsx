import React, { useEffect } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '1_app/providers/redux/store/store';
import {
    arrQuizDb,
    closeModal,
    isLoading,
    quizUserName,
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
import FormCreateQuiz from '../../../6_shared/ui/FormCreateQuiz/ui/FormCreateQuiz';
import { Modal } from '../../../6_shared/ui/Modal';
import QuizView from '../../../6_shared/ui/QuizzesView/ui/QuizView';
import { Spinner } from '../../../6_shared/ui/Spinner';
import { FirstQuiz } from '../../firstQuizPage';

const QuizListPage = () => {
    const dispatch: AppDispatch = useDispatch();

    const nameQuiz = useSelector(SelectorUserQuiz);
    const userId = useSelector(SelectorUserId);
    const quizData = useSelector(SelectorUserArrQuizzes);
    const loadData = useSelector(SelectorUserLoad);

    const navigate = useNavigate();

    const getAllQuiz = () => {
        axiosGetData(
            `/${JSON.parse(localStorage.getItem('data_user')).user_id}/quiz_all`,
            () => {
                dispatch(isLoading(true));
            },
        )
            .then(res => {
                dispatch(isLoading(false));
                dispatch(arrQuizDb(res.data.data));
            })
            .catch(err => {
                //todo обработать визуально ошибку и показать визуально что пошло нет так отработать это все
                navigate('/login');
                dispatch(isLoading(false));
            });
    };

    const submitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = axiosAuthPostData(`/${userId}/create_quiz`, { quiz_name: nameQuiz });

        response.then((res) => {
            //TODO написать нормальную реализацию ответа от сервера и показать визуально что пошло нет так отработать это все
            if (res.status === 200) {
                //todo убрать логи
                console.log('resTrue', res);
            }
            if (res.status === 403) {
                navigate('/login');
                //todo убрать логи
                console.log('resError', res);
            }
        });
        dispatch(quizUserName(''));
        dispatch(closeModal());
    };

    useEffect(() => {
        getAllQuiz();
    }, []);

    return (
        <>
            {
                loadData
                    ? <Spinner />
                    :
                    <>
                        {
                            quizData.length > 0 && (
                                <>
                                    {
                                        <QuizView quizList={quizData} />
                                    }
                                </>
                            )
                        }
                        <Modal>
                            <FormCreateQuiz submitForm={submitData} />
                        </Modal>
                        {
                            quizData.length === 0 && (
                                <FirstQuiz />
                            )
                        }
                    </>
            }
        </>
    );
};

export default QuizListPage;