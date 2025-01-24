import React, { FC } from 'react';

interface PropsListGroupWrapper {
    children: React.ReactNode
}
const ListGroupWrapper: FC<PropsListGroupWrapper> = ({children}) => {
    return (
        <ul className="w-full mb-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {children}
        </ul>
    );
};

export default ListGroupWrapper;