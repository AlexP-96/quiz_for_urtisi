import React, { FC } from 'react';

interface PropsListGroupBody {
    title: string;
}

const ListGroupBody: FC<PropsListGroupBody> = ({ title }) => {
    return (
        <li className='w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600'>
            <div>{title}</div>
            <button
                className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900'
            >
                Изменить
            </button>
            <button
                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
            >
                Удалить
            </button>
        </li>
    );
};

export default ListGroupBody;