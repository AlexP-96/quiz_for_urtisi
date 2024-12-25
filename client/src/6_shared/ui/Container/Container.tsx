import { ReactNode } from 'react';
import { classNames } from '../../lib/helpers/classNames/classNames';
import cls from './Container.module.scss';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

const Container = (props: ContainerProps) => {
    const {
        children,
        className,
    } = props;

    return (
        <div
            className={classNames(
                cls.container,
                {},
                [
                    className,
                ],
            )}
        >
            {children}
        </div>
    );
};

export default Container;