import React, {
    FormEvent,
    useEffect,
} from 'react';
import {
    Link,
    useNavigate,
} from 'react-router-dom';
import { Button } from '../../../6_shared/ui/Button/Button';
import { Input } from '../../../6_shared/ui/Input/Input';
import { Label } from '../../../6_shared/ui/Label/Label';
import axios, { AxiosResponse } from 'axios';

interface DataRegistration {
    email: string;
    password: string;
}

interface resData {
    data: string | null;
    error: {};
}

function RegisterPage() {
    const [data, setData] = React.useState<DataRegistration>({
        email: '',
        password: '',
    });

    const [resData, setResData] = React.useState<resData>({
            data: null,
            error: {},
        },
    );

    const navigate = useNavigate();

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response: AxiosResponse<resData> = await axios.post('http://localhost:4000/register', data);
            setResData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (resData.data !== null) {
            navigate('/login');
        }
    }, [resData.data]);

    return (
        <>
            {resData.data && 1}
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
                        Пройдите регистрацию
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
                                htmlFor='email'
                            >
                                Email адрес
                            </Label>
                            <div className='mt-2'>
                                <Input
                                    type='email'
                                    id='email'
                                    required={true}
                                    name='email'
                                    value={data.email}
                                    handleChange={(e) => setData({
                                        ...data,
                                        email: e.target.value,
                                    })}
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
                                    type='password'
                                    required={true}
                                    name='password'
                                    id='password'
                                    value={data.password}
                                    handleChange={(e) => setData({
                                        ...data,
                                        password: e.target.value,
                                    })}
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
}

export default RegisterPage;
