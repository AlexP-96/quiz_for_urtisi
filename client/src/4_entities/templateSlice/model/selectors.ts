import { RootState } from '1_app/providers/redux/store/store';

//todo переименовать селектора в нормально читаемые и понятные имена
export const SelectorUserLoad = (state: RootState) => state.user.loadStatus;
export const SelectorUserId = (state: RootState) => state.user.user_id;
export const SelectorUserEmail = (state: RootState) => state.user.email;
export const SelectorUserQuiz = (state: RootState) => state.user.quiz;
export const SelectorUserQuestions = (state: RootState) => state.user.question;
export const SelectorUserAnswers = (state: RootState) => state.user.answers;
export const SelectorUserArrQuizzes = (state: RootState) => state.user.allQuizzes;
export const SelectorUserError = (state: RootState) => state.user.error;


export const SelectorModalOpen = (state: RootState) => state.modal.isOpen;

