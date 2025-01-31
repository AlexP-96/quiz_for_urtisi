import
{
    userReducer,
    userIdReducer,
    emailUserReducer,
    quizValueUserReducer,
    answersValueUserReducer,
    questionValueUserReducer,
    allQuizzesUserReducer,
    isLoadingReducer,
    allQuestionsReducer,
    allAnswersReducer,
    errorUserReducer,
} from './slice/userSlice';
import {
    modalReducer,
    openModal,
    closeModal,
} from './slice/modalSlice';

const HOST = 'http://localhost:4000';

import { SelectorUserId } from './model/selectors';

export {
    userReducer,
    SelectorUserId,
    userIdReducer,
    modalReducer,
    openModal,
    closeModal,
    emailUserReducer,
    quizValueUserReducer,
    answersValueUserReducer,
    questionValueUserReducer,
    isLoadingReducer,
    allQuizzesUserReducer,
    allAnswersReducer,
    allQuestionsReducer,
    errorUserReducer,

    HOST,
};
