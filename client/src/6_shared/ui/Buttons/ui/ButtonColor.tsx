import React, { FC } from 'react';
import { GlobalColorEnum } from '../../../api/types/types';

interface PropsButtonColor {
    text: string;
    color?: string | GlobalColorEnum;
    className?: string;
}

const ButtonColor: FC<PropsButtonColor> = (props) => {
    const {
        color = 'blue',
        text,
        className,
    } = props;

    return (
        <button
            className={`focus:outline-none text-white bg-${color}-400 hover:bg-${color}-500 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-2 py-0.5 me-2 mb-2 dark:focus:ring-yellow-900 ${className}`}
        >
            {text}
        </button>
    );
};

export default ButtonColor;