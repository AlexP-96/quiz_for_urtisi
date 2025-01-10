import React, {
    FC,
    FormEvent,
    Fragment,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { answersUser } from '../../../4_entities/templateSlice';
import { SelectorUserAnswers } from '../../../4_entities/templateSlice/model/selectors';
import {
    AccordionBody,
    AccordionWrapper,
} from '../../../6_shared/ui/Accordion';
import BtnPopUpOpenModal from '../../../6_shared/ui/Buttons/ui/BtnPopUpOpenModal';
import { FormModal } from '../../../6_shared/ui/Forms';
import { InputDefault } from '../../../6_shared/ui/Inputs';
import PopUpModal from '../../../6_shared/ui/Modals/ui/PopUpModal';
import AnswersList from './AnswersList';

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

    createAnswer(e: FormEvent<HTMLFormElement>): void;
}

const QuestionsList: FC<PropsQuestionsList> = (props) => {
    const {
        questionsArr,
        createAnswer,
    } = props;
    const answerValueSelector = useSelector(SelectorUserAnswers);
    const dispatch = useDispatch();
    const handlerClick = () => {
        // if (props.openModal) {
        //     props.openModal({
        //         questionId: props.id,
        //     });
        // }
    };

    const handlerChangeInput = () => {
        dispatch(answersUser(answerValueSelector));
    };

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <AccordionWrapper>
            {
                questionsArr.map((question: IQuestionData) => {
                    return (
                        <Fragment key={question.question_id}>
                            <PopUpModal
                                idModal={nameIdModalAnswer.createAnswer + question.question_id}
                            >
                                <InputDefault
                                    text='Введите название вашего ответа'
                                    value={answerValueSelector}
                                    changeEvent={handlerChangeInput}
                                />
                            </PopUpModal>
                            <AccordionBody
                                id={question.question_id}
                                key={question.question_id}
                                openModal={handlerClick}
                                title={question.question_name}
                            >
                                <AnswersList answersArr={question.answers} />
                            </AccordionBody>
                            <BtnPopUpOpenModal
                                idPopUpTarget={nameIdModalAnswer.createAnswer + question.question_id}
                                text='Создать ответ'
                                type='submit'
                                color='green'
                            />
                        </Fragment>
                    );
                })
            }
        </AccordionWrapper>
    );
};

export default QuestionsList;