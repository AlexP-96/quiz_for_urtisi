import React from 'react';
import { classNames } from '6_shared/lib/helpers/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps {
    className?: string;
    eventClick?: () => void;
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
    className,
    children,
    eventClick,
    type,
}: ButtonProps) => {
    return (
        <button
            onClick={eventClick}
            type={type}
            className={classNames(cls.button, {}, [className])}
        >
            {children}
        </button>
    )
        ;
};

