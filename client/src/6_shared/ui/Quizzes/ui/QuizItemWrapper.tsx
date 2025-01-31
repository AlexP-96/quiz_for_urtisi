import { AppLink } from '6_shared/ui/AppLink/AppLink';
import {
    FormEvent,
    useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../1_app/providers/redux/store/store';
import { deleteQuiz } from '../../../../4_entities/templateSlice/asyncThunks/QuizAsyncThunk';
import { IQuizzes } from '../../../../4_entities/templateSlice/slice/userSlice';
import { FaWindowClose } from 'react-icons/fa';
import { getLSUser } from '../../../lib/helpers/localStorage/localStorage';
import ModalPopUpTailwind from '../../Modals/ui/ModalPopUpTailwind';
import cls from './style.module.scss';

export interface PropsQuizView {
    quizList: IQuizzes[];
}

export interface QuizResData {
    quiz_id: number;
    quiz_name: string;
}

const QuizItemWrapper = (props: PropsQuizView) => {
    const {
        quizList,
    } = props;

    const [openModal, setModalOpen] = useState(false);
    const [quizId, setQuizId] = useState<number | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const handlerClickIcon = (quiz_id: number) => {
        setModalOpen(true);
        setQuizId(quiz_id);
    };

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(deleteQuiz({
            quiz_id: quizId,
            user_id: getLSUser().user_id,
        }));
    };

    return (
        <div className='mx-auto flex flex-wrap gap-5 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            {quizList.map((quiz: QuizResData) => (
                <div
                    className='relative w-3/12 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
                    key={quiz.quiz_id}
                >
                    <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        {quiz.quiz_name}
                    </h5>
                    <FaWindowClose
                        tabIndex={0}
                        color='red'
                        size={30}
                        onClick={() => handlerClickIcon(quiz.quiz_id)}
                        className={cls.iconClose}
                    />
                    <AppLink
                        to={`/quiz/${quiz.quiz_id}`}
                        className='inline-flex items-center px-3 py-2 text-sm mt-5 font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                    >
                        Редактировать
                    </AppLink>
                </div>
            ))}
            <ModalPopUpTailwind
                isVisible={openModal}
                onCloseModal={() => setModalOpen(false)}
                textBtnAccess='Удалить'
                textBtnCancel='Отмена'
                title='Вы действительно хотите удалить данный Quiz?'
                submitForm={submitForm}
            />
        </div>
    );
};

export default QuizItemWrapper;