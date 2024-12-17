import React, {useState} from 'react';
import {classNames} from '6_shared/lib/helpers/classNames/classNames';

interface HomeProps {
    className?: string;
    children?: React.ReactNode;
    visible?: boolean;
}

export const Text = ({className, children, visible}: HomeProps) => {

    const [showField, setShowField] = useState<boolean>(true);

    const handlerVisible = () => {
        setShowField(visible);
    }

    return (
        showField &&
        <div className={classNames('', {}, [className])}>
            {children}
        </div>
    );
};

