import React, { FC } from 'react';

enum Color {
    yellow = 'yellow',
    red = 'red',
    green = 'green',
    blue = 'blue'
}

interface PropsButtonColor {
    title: string;
    color?: string | Color;
    className?: string
}

const ButtonColor: FC<PropsButtonColor> = (props) => {
    const {
        color = 'blue',
        title,
        className
    } = props;

    return (
        <button
            className={`focus:outline-none text-white bg-${color}-400 hover:bg-${color}-500 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-2 py-0.5 me-2 mb-2 dark:focus:ring-yellow-900 ${className}`}
        >
            {title}
        </button>
    );
};

export default ButtonColor;