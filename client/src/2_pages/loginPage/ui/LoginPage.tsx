import {
    AxiosError,
    AxiosResponse,
} from 'axios';
import React, {
    useEffect,
    useState,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    Link,
    useNavigate,
} from 'react-router-dom';
import { AppDispatch } from '1_app/providers/redux/store/store';
import {
    closeModal,
    emailUserReducer,
    isLoadingReducer,
    userIdReducer,
} from '4_entities/templateSlice';
import {
    loginUserAxios,
} from '6_shared/api/axiosRequests';
import { setLSUser } from '../../../6_shared/lib/helpers/localStorage/localStorage';
import { Button } from '../../../6_shared/ui/Buttons/Button';
import { Input } from '../../../6_shared/ui/Inputs/ui/Input';
import { Label } from '6_shared/ui/Label/Label';
import { SelectorUserError } from '4_entities/templateSlice/model/selectors';
import { errorUserReducer } from '4_entities/templateSlice/slice/userSlice';

interface reqData {
    email: string;
    password: string;
}

interface resDataLogin {
    user_id: number;
    email: string;
    token: string;
}

interface resDataLoginLocal {
    userIdLocal: string,
    tokenLocal: string,
    emailLocal: string,
}

interface resErrorLogin {
    error: string;
}

const LoginPage = () => {
    const [data, setData] = useState<reqData>({
        email: '',
        password: '',
    });

    const dispatch = useDispatch<AppDispatch>();
    const errorLogin = useSelector(SelectorUserError);

    const navigate = useNavigate();

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUserAxios(data, () => dispatch(isLoadingReducer('loading')))
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    dispatch(isLoadingReducer('succeeded'));

                    const {
                        user_id,
                        token,
                        email,
                    }: resDataLogin = response.data.data;

                    dispatch(emailUserReducer(email));
                    dispatch(userIdReducer(user_id));

                    setLSUser({
                        email,
                        token,
                        user_id,
                    });
                    if (user_id && email) {
                        navigate('/main_menu');
                    }
                }
            })
            .catch((error: AxiosError) => {
                dispatch(isLoadingReducer('failed'));
                dispatch(errorUserReducer('Ошибка при авторизации'));

                return error;
            });
        ;
    };

    const handlerCloseModal = () => {
        dispatch(closeModal());
    };

    useEffect(() => {

    }, [errorLogin]);
    //todo переделать страницу авторизации на компоненты
    return (
        <>
            {/*<Modals >*/}
            {/*    Пользователь не зарегестрирован, пройдите регстрацию*/}
            {/*    <Link*/}
            {/*        to='/register'*/}
            {/*    >*/}
            {/*        /!*todo сделать красивую стилизацию для не зарегестрированного пользователя*!/*/}
            {/*        <Buttons*/}
            {/*            className={'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'}*/}
            {/*            eventClick={handlerCloseModal}*/}
            {/*        >*/}
            {/*            Перейти*/}
            {/*        </Buttons>*/}
            {/*    </Link>*/}
            {/*</Modals>*/}
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
                        Войдите в свою учетную запись
                    </h2>
                </div>
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form
                        onSubmit={submitForm}
                        method='POST'
                        className='space-y-6'
                    >
                        <div>
                            <Label
                                htmlFor={'email'}
                            >
                                Email адрес
                            </Label>
                            <div className='mt-2'>
                                <Input
                                    type={'email'}
                                    handleChange={e => setData({
                                        ...data,
                                        email: e.target.value,
                                    })}
                                    id={'email'}
                                    required={true}
                                    value={data.email}
                                    name={'email'}
                                    placeholder={'Email'}
                                    className={'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center justify-between'>
                                <Label htmlFor='password'>
                                    Пароль
                                </Label>
                                <div className='text-sm'>
                                    <Link
                                        to='/forgot_pass'
                                        className='font-semibold text-indigo-600 hover:text-indigo-500'
                                    >
                                        Забыли пароль?
                                    </Link>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <Input
                                    type={'password'}
                                    handleChange={e => setData({
                                        ...data,
                                        password: e.target.value,
                                    })}
                                    required={true}
                                    name='password'
                                    value={data.password}
                                    id='password'
                                    className={'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                type={'submit'}
                                className={'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'}
                            >
                                Войти
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;