import cls from './QuizView.module.scss';
import { Button } from '../../Button/Button';
import { classNames } from '../../../lib/helpers/classNames/classNames';

interface PropsQuizView {
    nameQuiz: string;
}

const QuizView = (props: PropsQuizView) => {
    const { nameQuiz } = props;
    return (
        <div
            className={classNames(
                cls.elemQuiz,
                {},
                [],
            )}
        >
            <p
                className={classNames(
                    cls.quizTitle,
                    {},
                    [],
                )}
            >{nameQuiz}</p>
            <Button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                Редактировать
            </Button>
        </div>
    );
};

export default QuizView;