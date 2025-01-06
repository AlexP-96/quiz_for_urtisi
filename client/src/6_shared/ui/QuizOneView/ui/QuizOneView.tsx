import React, { FC } from 'react';

interface IQuizData {
    questions: [];
    quiz_id: number;
    quiz_name: string;
}

const QuizOneView: FC<IQuizData> = ({
    quiz_name,
    quiz_id,
    questions,
}) => {
    return (
        <div>

        </div>
    );
};

export default QuizOneView;