import {RouteProps} from 'react-router-dom';
import {HomePage} from '2_pages/homePage';
import { Login } from '../../../2_pages/loginPage';
import { RegisterPage } from '../../../2_pages/registerPage';

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    LOGOUT = 'logout',
    REGISTER = 'register',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.LOGOUT]: '/logout',
    [AppRoutes.REGISTER]: '/register',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <HomePage/>,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <Login/>,
    },
    [AppRoutes.LOGOUT]: {
        path: RoutePath.logout,
        element: <HomePage/>,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage/>,
    }

}