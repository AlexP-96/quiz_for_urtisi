import React from 'react';
import { classNames } from '6_shared/lib/helpers/classNames/classNames';
import cls from './Label.module.scss';

interface LabelProps {
    className?: string;
    children?: React.ReactNode;
    htmlFor: string
}

export const Label = (props: LabelProps) => {
    const {
        className,
        htmlFor,
        children
    } = props;

    return (
        <label
            className={classNames(
                cls.Label,
                {},
                [
                    className,
                ],
            )}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
};

