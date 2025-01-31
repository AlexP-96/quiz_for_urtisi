import React, {
    ChangeEvent,
    Fragment,
    useEffect,
    useState,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    AppDispatch,
} from '1_app/providers/redux/store/store';
import {
    quizValueUserReducer,
} from '4_entities/templateSlice';
import {
    SelectorUserArrQuizzes,
    SelectorUserQuiz,
} from '4_entities/templateSlice/model/selectors';
import {
    createQuiz,
    fetchQuizzesAll,
} from '../../../4_entities/templateSlice/asyncThunks/QuizAsyncThunk';
import { getLSUser } from '../../../6_shared/lib/helpers/localStorage/localStorage';
import ButtonOpenModal from '../../../6_shared/ui/Buttons/ui/ButtonOpenModal';
import { InputModal } from '../../../6_shared/ui/Inputs';
import ModalPopUpTailwind from '../../../6_shared/ui/Modals/ui/ModalPopUpTailwind';
import QuizItemWrapper from '../../../6_shared/ui/Quizzes/ui/QuizItemWrapper';
import WrapperContent from '../../../6_shared/ui/WrapperSection/ui/WrapperContent/WrapperContent';
import WrapperSection from '../../../6_shared/ui/WrapperSection/ui/WrapperSection/WrapperSection';
import { FirstQuiz } from '../../firstQuizPage';

const QuizListPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [modal, setModal] = useState(false);

    const nameQuizSelector = useSelector(SelectorUserQuiz);
    const quizDataSelector = useSelector(SelectorUserArrQuizzes);

    const submitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createQuiz({
            user_id: getLSUser().user_id,
            post_data: nameQuizSelector,
        }));
    };

    const handlerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(quizValueUserReducer(event.target.value));
    };

    useEffect(() => {
        dispatch(fetchQuizzesAll(getLSUser().user_id));
    }, []);

    if (quizDataSelector.length === 0) {
        return <FirstQuiz />;
    }

    return (
        <Fragment>
            {
                quizDataSelector.length &&
                <QuizItemWrapper
                    quizList={quizDataSelector}
                />
            }
            <WrapperContent>
                <ButtonOpenModal
                    text='Создать новый Quiz'
                    onOpenModal={() => setModal(true)}
                />
            </WrapperContent>
            <ModalPopUpTailwind
                title={'Введите название вашего Квиза'}
                textBtnAccess={'Создать'}
                textBtnCancel={'Отмена'}
                isVisible={modal}
                onCloseModal={() => setModal(false)}
                submitForm={submitData}
            >
                <InputModal
                    value={nameQuizSelector}
                    changeEvent={handlerInputChange}
                />
            </ModalPopUpTailwind>
        </Fragment>
    );
};

export default QuizListPage;