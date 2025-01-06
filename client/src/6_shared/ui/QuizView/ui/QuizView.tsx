import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';

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
        <div className='bg-white'>
            <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
                <h2 className='sr-only'>Products</h2>
                <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                    {quizList.map((quiz: QuizResData) => (
                        <Link
                            key={quiz.quiz_id}
                            to={'#'}
                            className='group'
                        >
                            <h3 className='mt-4 text-sm text-gray-700'>{quiz.quiz_name}</h3>
                            <Button>Перейти</Button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>);
};

export default QuizView;