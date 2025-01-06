import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';
import QuizPage from '../../../../2_pages/quizPage/ui/QuizPage';

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
                        <QuizPage
                            quiz_id={quiz.quiz_id}
                            quiz_data={quizList}
                        />
                    }
                    {/*<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Here are the biggest enterprise*/}
                    {/*    technology*/}
                    {/*    acquisitions of 2021 so far, in reverse chronological order.*/}
                    {/*</p>*/}
                    <Button
                        className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M1 5h12m0 0L9 1m4 4L9 9'
                            />
                        </svg>
                    </Button>
                </div>
            ))}
        </div>
    );

};

export default QuizView;