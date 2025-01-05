import React, {
    Suspense,
    useEffect,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../1_app/providers/redux/store/store';
import { FirstQuiz } from '../../../../2_pages/firstQuiz';
import {
    arrQuizDb,
    closeModal,
    isLoading,
    openModal,
    quizUserName,
    SelectorUserId,
} from '../../../../4_entities/templateSlice';
import {
    SelectorUserArrQuizzes,
    SelectorUserLoad,
    SelectorUserQuiz,
} from '../../../../4_entities/templateSlice/model/selectors';
import {
    axiosAuthPostData,
    axiosGetData,
} from '../../../api/axiosRequests';
import { Button } from '../../Button/Button';
import { FormCreateQuiz } from '../../FormCreateQuiz';
import { Modal } from '../../Modal';
import QuizView from '../../QuizView/ui/QuizView';

export default function Bento() {
    const dispatch: AppDispatch = useDispatch();

    const nameQuiz = useSelector(SelectorUserQuiz);
    const userId = useSelector(SelectorUserId);
    const quizData = useSelector(SelectorUserArrQuizzes);
    const loadData = useSelector(SelectorUserLoad);

    const navigate = useNavigate();

    const getAllQuiz = () => {
        axiosGetData(`/${JSON.parse(localStorage.getItem('data_user')).user_id}/quiz_all`)
            .then(res => {
                dispatch(isLoading(true));
                dispatch(arrQuizDb(res.data.data));
            })
            .catch(err => {
                //todo обработать визуально ошибку и показать визуально что пошло нет так отработать это все
                navigate('/login');
                dispatch(isLoading(false));
                console.log('err', err);
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
        <Suspense fallback='ЗАгрузка'>
            <>
                {
                    quizData.length > 0 && (
                        <>
                            {
                                quizData.map((quiz: any, index) => (
                                    <QuizView
                                        key={index}
                                        nameQuiz={quiz.quiz_name}
                                    />
                                ))
                            }
                            <Button>Да</Button>
                        </>
                    )
                }
                <Modal>
                    <FormCreateQuiz submitForm={submitData} />
                </Modal>
                {
                    quizData.length === 0 && loadData && (
                        <FirstQuiz />
                    )
                }
            </>
        </Suspense>
    );
}