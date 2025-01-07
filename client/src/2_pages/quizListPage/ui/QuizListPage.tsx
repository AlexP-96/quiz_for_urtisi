import React, {useEffect} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AppDispatch} from '1_app/providers/redux/store/store';
import {
    arrQuizDb,
    closeModal, emailUser,
    isLoading,
    quizUserName, userId,
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
import {Modal} from '../../../6_shared/ui/Modal';
import QuizView from '../../../6_shared/ui/QuizzesView/ui/QuizView';
import {Spinner} from '../../../6_shared/ui/Spinner';
import {FirstQuiz} from '../../firstQuizPage';

const QuizListPage = () => {
    const dispatch: AppDispatch = useDispatch();

    const nameQuizSelector = useSelector(SelectorUserQuiz);
    const userIdSelector = useSelector(SelectorUserId);
    const quizDataSelector = useSelector(SelectorUserArrQuizzes);
    const loadDataSelector = useSelector(SelectorUserLoad);

    const navigate = useNavigate();

    const getAllQuiz = async () => {
        const response = await axiosGetData(
            `/${JSON.parse(localStorage.getItem('data_user')).user_id}/quiz_all`,
            () => {
                dispatch(isLoading(true));
            },
        )
        //todo обработать визуально ошибку и показать визуально что пошло нет так отработать это все
        if (response.status === 200) {
            dispatch(isLoading(false));
            console.log('da')
            dispatch(arrQuizDb(response.data.data));
        }

        if (response.status === 403) {
            console.log('net')
            localStorage.setItem('data_user', JSON.stringify({
                email: '',
                user_id: '',
                token: '',
            }))
            dispatch(userId(''))
            dispatch(emailUser(''))
            navigate('/login');
            dispatch(isLoading(false));
        }
    };

    const submitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = axiosAuthPostData(`/${userIdSelector}/create_quiz`, {quiz_name: nameQuizSelector});

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
                loadDataSelector
                    ? <Spinner/>
                    :
                    <>
                        {
                            quizDataSelector.length > 0 && (
                                <>
                                    {
                                        <QuizView quizList={quizDataSelector}/>
                                    }
                                </>
                            )
                        }
                        <Modal>
                            <FormCreateQuiz submitForm={submitData}/>
                        </Modal>
                        {
                            quizDataSelector.length === 0 && (
                                <FirstQuiz/>
                            )
                        }
                    </>
            }
        </>
    );
};

export default QuizListPage;