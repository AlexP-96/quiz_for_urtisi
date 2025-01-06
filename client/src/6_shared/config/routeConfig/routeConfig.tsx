import { RouteProps } from 'react-router-dom';
import { HomePage } from '2_pages/homePage';
import { LoginPage } from '../../../2_pages/loginPage';
import { QuizListPage } from '../../../2_pages/quizListPage';
import { QuizPage } from '../../../2_pages/quizPage';
import { RegisterPage } from '../../../2_pages/registerPage';

export enum AppRoutes {
    HOME = 'home',
    LOGIN = 'login',
    LOGOUT = 'logout',
    REGISTER = 'register',
    FORGOT_PASSWORD = 'forgot_pass',
    MAIN_MENU = 'main_menu',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.LOGOUT]: '/logout',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.FORGOT_PASSWORD]: '/forgot_pass',
    [AppRoutes.MAIN_MENU]: '/main_menu',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.HOME]: {
        path: RoutePath.home,
        element: <HomePage />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoutes.LOGOUT]: {
        path: RoutePath.logout,
        element: <HomePage />,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage />,
    },
    [AppRoutes.FORGOT_PASSWORD]: {
        path: RoutePath.register,
        element: <RegisterPage />,
    },
    [AppRoutes.MAIN_MENU]: {
        path: RoutePath.main_menu,
        element: <QuizListPage />,
    },
};