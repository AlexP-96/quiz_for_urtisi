import React, { FC } from 'react';

interface IQuizzesData {
    quiz_id: number;
}

interface IQuizData {
    questions: [];
    quiz_id: number;
    quiz_name: string;
}

interface IQuestionData {
    question_name: string;
    question_id: number;
    answers: [];
    quiz_id: number;
}

interface IAnswerData {
    answer_id: number;
    answer_name: string;
    question_id: number;
    type: string;
}

interface QuizPageProps {
    quiz_id: number;
    quiz_data: [];
}

const QuizPage: FC<QuizPageProps> = ({
    quiz_data,
    quiz_id,
}) => {
    const arrAnswers = quiz_data.filter((item: IQuizzesData) => item.quiz_id === Number(quiz_id));

    return (
        <div>
            {arrAnswers.map((quiz: IQuizData) => {
                return (
                    <div key={quiz.quiz_id}>
                        {
                            quiz.questions.map((question: IQuestionData) => {
                                return (
                                    <div key={question.question_id}>
                                        {question.question_name}
                                        {question.answers.map((answer: IAnswerData) => {
                                            return (
                                                <div key={answer.answer_id}>
                                                    {answer.answer_name}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default QuizPage;