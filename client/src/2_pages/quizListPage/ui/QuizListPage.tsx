import React, {
    ChangeEvent,
    Fragment,
    useEffect,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    AppDispatch,
} from '1_app/providers/redux/store/store';
import {
    isLoading,
    quizUserName,
} from '4_entities/templateSlice';
import {
    SelectorUserArrQuestions,
    SelectorUserArrQuizzes,
    SelectorUserId,
    SelectorUserQuiz,
} from '4_entities/templateSlice/model/selectors';
import {
    createQuizAxios,
} from '6_shared/api/axiosRequests';
import { fetchQuizzesAll } from '../../../4_entities/templateSlice/asyncThunks/QuizAsyncThunk';
import { getLSUser } from '../../../6_shared/lib/helpers/localStorage/localStorage';
import { BtnPopUpCloseModal } from '../../../6_shared/ui/Buttons';
import BtnPopUpOpenModal from '../../../6_shared/ui/Buttons/ui/BtnPopUpOpenModal';
import { FormModal } from '../../../6_shared/ui/Forms';
import { InputModal } from '../../../6_shared/ui/Inputs';
import ModalPopUp from '../../../6_shared/ui/Modals/ui/ModalPopUp';
import QuizItemWrapper from '../../../6_shared/ui/Quizzes/ui/QuizItemWrapper';
import { FirstQuiz } from '../../firstQuizPage';
import {
    AxiosError,
    AxiosResponse,
} from 'axios';

const QuizListPage = () => {
    const dispatch: AppDispatch = useDispatch();

    const nameQuizSelector = useSelector(SelectorUserQuiz);
    const userIdSelector = useSelector(SelectorUserId);
    const quizDataSelector = useSelector(SelectorUserArrQuizzes);
    const questionsDataSelector = useSelector(SelectorUserArrQuestions);
    const navigate = useNavigate();

    const submitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createQuizAxios({
            user_id: userIdSelector,
            postData: { quiz_name: nameQuizSelector },
        }, () => dispatch(isLoading('loading')))
            .then((response: AxiosResponse) => {
                dispatch(isLoading('succeeded'));

                if (response.status === 200) {
                    console.log('Был успешный запрос на создание нового квиза', response);
                }
                if (response.status === 403) {
                    navigate('/login');
                    console.log('Был успешный запрос на создание нового квиза', response);
                }
            })
            .catch((error: AxiosError) => {
                dispatch(isLoading('failed'));

            });
    };

    const handlerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(quizUserName(event.target.value));
    };

    useEffect(() => {
        dispatch(fetchQuizzesAll(getLSUser().user_id));
    }, []);

    if (quizDataSelector.length === 0) {
        return <FirstQuiz />;
    }

    return (
        <Fragment>
            <ModalPopUp
                idModal={'modal-list-quiz'}
            >
                <FormModal
                    submitForm={submitData}
                    sectionButtons={[
                        <BtnPopUpCloseModal
                            key='1'
                            popUpTarget={'modal-list-quiz'}
                            text='Создать'
                            type='submit'
                            color='blue'
                        />,
                        <BtnPopUpCloseModal
                            key='2'
                            popUpTarget={'modal-list-quiz'}
                            text='Отмена'
                            type='button'
                            color='red'
                        />,
                    ]}
                >
                    <InputModal
                        labelText='Введите название вашего Квиза'
                        value={nameQuizSelector}
                        changeEvent={handlerInputChange}
                    />
                </FormModal>
            </ModalPopUp>
            {
                quizDataSelector.length > 0 &&
                <QuizItemWrapper
                    quizList={quizDataSelector}
                />
            }
            {/*//todo сделать контейнер для стилей*/}
            <div
                className='mx-auto flex flex-wrap gap-2 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'
            >
                <BtnPopUpOpenModal
                    type='button'
                    text='Создать новый Quiz'
                    idPopUpTarget={'modal-list-quiz'}
                />
            </div>
        </Fragment>
    );
};

export default QuizListPage;