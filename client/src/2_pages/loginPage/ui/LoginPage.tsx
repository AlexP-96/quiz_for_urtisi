import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../../1_app/providers/redux/store/store';
import {
    emailUser,
    SelectorUserId,
    userId,
} from '../../../4_entities/templateSlice';
import { axiosPostData } from '../../../6_shared/api/axiosRequests';
import { Button } from '../../../6_shared/ui/Button/Button';
import { Input } from '../../../6_shared/ui/Input/Input';
import { Label } from '../../../6_shared/ui/Label/Label';

interface reqData {
    email: string;
    password: string;
}

interface resDataLogin {
    user_id: string;
    email: string;
    token: string;
}

const LoginPage = () => {
    const [data, setData] = React.useState<reqData>({
        email: '',
        password: '',
    });

    const dispatch = useDispatch<AppDispatch>();
    const selector = useSelector(SelectorUserId);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response: AxiosResponse = await axiosPostData('/login', data);

        if (response.status === 200) {
            const {
                user_id,
                token,
                email,
            }: resDataLogin = response.data.data;
            console.log(response.data);

            localStorage.setItem(
                'data_user',
                JSON.stringify({
                    user_id,
                    email,
                    token
                })
            );

            dispatch(emailUser(email));
            dispatch(userId(user_id));
        }
    };

    useEffect(() => {
        // dispatch(userId('223'));
    }, []);

    console.log(selector);
    return (
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
    );
};

export default LoginPage;