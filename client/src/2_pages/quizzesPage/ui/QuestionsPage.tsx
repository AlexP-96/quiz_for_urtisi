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

    createAnswer(e: FormEvent<HTMLFormElement>): void;
}

const QuestionsPage: FC<PropsQuestionsList> = (props) => {
    const {
        questionsArr,
    } = props;

    const params = useParams();
    const [data, setData] = useState(questionsArr);

    const answerValueSelector = useSelector(SelectorUserAnswers);
    const [questionId, setQuestionId] = useState<string | number>('');

    const dispatch = useDispatch();

    const handlerChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(answersUser(e.target.value));
    };

    const handlerCloseModal = () => {
        // dispatch(answersUser(''));
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
                        </Fragment>
                    );
                })
            }
        </Accordion>
    );
};

export default QuestionsPage;