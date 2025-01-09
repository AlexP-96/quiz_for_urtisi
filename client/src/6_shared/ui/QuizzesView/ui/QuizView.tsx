import { Button } from '@headlessui/react';
import CardViewQuiz from '2_pages/cardViewQuiz/ui/CardViewQuiz';
import { Link } from 'react-router-dom';
import { AppLink } from '6_shared/ui/AppLink/AppLink';

//todo сложить нормально типы и интерфейсы

export interface PropsQuizView {
    quizList: [];
}

export interface QuizResData {
    quiz_id: number;
    quiz_name: string;
}

const QuizView = (props: PropsQuizView) => {
    const { quizList } = props;

    return (
        <div className='mx-auto flex flex-wrap gap-2 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
            {quizList.map((quiz: QuizResData) => (
                <div
                    className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
                    key={quiz.quiz_id}
                >
                    <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        {quiz.quiz_name}
                    </h5>
                    {
                        <CardViewQuiz
                            quizId={quiz.quiz_id}
                            quizData={quizList}
                        />
                    }
                    <AppLink
                        to={`/quiz/${quiz.quiz_id}`}
                        className='inline-flex items-center px-3 py-2 text-sm mt-5 font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                    >
                        Редактировать
                        <svg
                            className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 14 10'
                        >
                            <path
                                stroke='currentColor'
                                strokeLinejoin='round'
                                strokeLinecap='round'
                                strokeWidth='2'
                                d='M1 5h12m0 0L9 1m4 4L9 9'
                            />
                        </svg>
                    </AppLink>
                </div>
            ))}
        </div>
    );

};

export default QuizView;