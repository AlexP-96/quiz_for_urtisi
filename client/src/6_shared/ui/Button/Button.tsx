import React from 'react';
import { classNames } from '6_shared/lib/helpers/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps {
    className?: string;
    eventClick?: () => void;
    children?: React.ReactNode;
}

export const Button = ({
    className,
    children,
    eventClick,
}: ButtonProps) => {
    return (
        <button
            className={classNames(cls.button, {}, [className])}
            onClick={eventClick}
        >
            {children}
        </button>
    );
};

