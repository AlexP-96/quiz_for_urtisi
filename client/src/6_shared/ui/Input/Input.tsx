import React from 'react';
import {classNames} from '6_shared/lib/helpers/classNames/classNames';
import cls from './Input.module.scss';

interface InputProps {
    className?: string;
    value?: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    checked?: boolean;
    name?: string
}

export const Input = (props: InputProps) => {
    const {className, value, handleChange, type, checked, name} = props;

    return (
        <input
            className={classNames(cls.input, {}, [className])}
            type={type}
            value={value}
            name={name}
            onChange={handleChange}
            checked={checked}
        />
    );
};

