import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '1_app/providers/redux/store/store';
import {openModal} from '4_entities/templateSlice';
import {Button} from '6_shared/ui/Button/Button';
import {SelectorUserArrQuizzes} from "4_entities/templateSlice/model/selectors";
import {useNavigate} from "react-router-dom";

const FirstQuiz = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const existQuizzes = useSelector(SelectorUserArrQuizzes);

    useEffect(() => {
        if (existQuizzes.length > 0) navigate('/main_menu')
    }, [existQuizzes]);
    return (
        <div className='bg-gray-50 py-24 sm:py-32'>
            <div className='mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8'>
                <p className='mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl'>
                    Создайте ваш первый квиз
                </p>
                <div className='mt-10 grid gap-4'>
                    <div className='relative lg:row-span-2'>
                        <div
                            className='relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]'>
                            <div className='px-8 pb-3 pt-8 sm:px-10 sm:pb-8 sm:pt-10'>
                                <p className='mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center pb-10'>
                                    У вас еще нет ни одного квиза, создайте свой первый квиз
                                </p>
                                <Button
                                    eventClick={() => dispatch(openModal())}
                                    className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                >
                                    Создать
                                </Button>
                            </div>
                            <div className='relative w-full grow max-lg:mx-auto max-lg:max-w-sm'>
                            </div>
                        </div>
                        <div
                            className='pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]'></div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FirstQuiz;