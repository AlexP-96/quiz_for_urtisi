import React from 'react';
import { Link } from 'react-router-dom';

//todo стилизовать страницу не найдено можно взять готовый компонент
const NotFoundPage = () => {
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                    Страница не найдена
                </h1>
                <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                    Иди отсюда пидор грязный
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to="/"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Вернуться на домашнюю страницу
                    </Link>
                    <Link
                        to="mailto:lubu221996@yandex.ru"
                        className="text-sm font-semibold text-gray-900"
                    >
                        Написать на почту <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFoundPage;