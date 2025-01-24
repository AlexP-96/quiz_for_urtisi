import {
    AxiosError,
    AxiosResponse,
} from 'axios';
import React, {
    ChangeEvent,
    FC,
    FormEvent,
    Fragment,
    useState,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    answersUser,
    isLoading,
} from '../../../4_entities/templateSlice';
import { SelectorUserAnswers } from '../../../4_entities/templateSlice/model/selectors';
import { errorUser } from '../../../4_entities/templateSlice/slice/userSlice';
import { createAnswerAxios } from '../../../6_shared/api/axiosRequests';
import { getLSUser } from '../../../6_shared/lib/helpers/localStorage/localStorage';
import {
    Accordion,
} from '6_shared/ui/Accordion';
import { BtnPopUpCloseModal } from '../../../6_shared/ui/Buttons';
import BtnPopUpOpenModal from '../../../6_shared/ui/Buttons/ui/BtnPopUpOpenModal';
import { FormModal } from '../../../6_shared/ui/Forms';
import { InputModal } from '../../../6_shared/ui/Inputs';
import ModalPopUp from '../../../6_shared/ui/Modals/ui/ModalPopUp';
import AnswersPage from './AnswersPage';

enum nameIdModalAnswer {
    createAnswer = 'modal-create-answer-'
}

interface IQuestionData {
    question_name: string;
    question_id: number;
    answers: [];
}

interface PropsQuestionsList {
    questionsArr: IQuestionData[];

    createAnswer?(e: FormEvent<HTMLFormElement>): void;
}

const QuestionsPage: FC<PropsQuestionsList> = (props) => {
    const {
        questionsArr,
    } = props;

    const params = useParams();

    const [data, setData] = useState<any>(questionsArr);

    console.log('data', data);
    const answerValueSelector = useSelector(SelectorUserAnswers);
    const [questionId, setQuestionId] = useState<string | number>('');

    const dispatch = useDispatch();

    const handlerChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(answersUser(e.target.value));
    };

    const handlerCloseModal = () => {
        // dispatch(answersUser(''));
    };

    const submitForm = (e: FormEvent<HTMLFormElement>, questionID: number) => {
        e.preventDefault();
        createAnswerAxios({
            user_id: getLSUser().user_id,
            quiz_id: params.quiz_id,
            question_id: questionID,
            postData: answerValueSelector,
        }, () => dispatch(isLoading('loading')))
            .then((response: AxiosResponse) => {
                console.log('response_questions', response);
                console.log('response.data.data.title', response.data.data);
                const updateData = data
                    .map((question: any) => {
                        if (question.question_id === questionID) {
                            return {
                                ...question,
                                answers: [
                                    ...question.answers,
                                    response.data.data
                                ]
                            }
                        }
                        return question;
                    });
                console.log('updateData', updateData);

                setData(updateData);
                dispatch(isLoading('succeeded'));
            })
            .catch((error: AxiosError) => {
                dispatch(answersUser(''));
                return {
                    error: error,
                };
            });
    };

    return (
        <Accordion>
            {
                data.map((question: IQuestionData) => {
                    return (
                        <Fragment key={question.question_id}>
                            <Accordion.Body
                                id={question.question_id}
                                key={question.question_id}
                                title={question.question_name}
                            >
                                <AnswersPage answersArr={question.answers} />
                            </Accordion.Body>

                            <ModalPopUp
                                idModal={question.question_name + question.question_id}
                                onClick={handlerCloseModal}
                            >
                                <FormModal
                                    submitForm={(e) => submitForm(e, question.question_id)}
                                    method='post'
                                    sectionButtons={[
                                        <BtnPopUpCloseModal
                                            key='1'
                                            popUpTarget={question.question_name + question.question_id}
                                            text='Создать'
                                            type='submit'
                                            color={'green'}
                                        />,
                                        <BtnPopUpCloseModal
                                            key='2'
                                            popUpTarget={question.question_name + question.question_id}
                                            text='Отмена'
                                            type='button'
                                            color={'red'}
                                            onClick={handlerCloseModal}
                                        />,
                                    ]}
                                >
                                    <InputModal
                                        labelText='Введите название вашего ответа'
                                        value={answerValueSelector}
                                        changeEvent={handlerChangeInput}
                                    />
                                </FormModal>
                            </ModalPopUp>
                            <BtnPopUpOpenModal
                                idPopUpTarget={question.question_name + question.question_id}
                                text='Создать ответ'
                                type='submit'
                                color='green'
                            />
                        </Fragment>
                    );
                })
            }
        </Accordion>
    );
};

export default QuestionsPage;