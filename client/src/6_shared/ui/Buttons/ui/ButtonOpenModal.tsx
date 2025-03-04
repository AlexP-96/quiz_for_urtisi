import React, { FC } from 'react';

interface PropsButtonOpenModal {
    text: string;
    backgroundColor?: string;
    textColor?: string;
    className?: string;
    onOpenModal?: () => void;
}

const ButtonOpenModal: FC<PropsButtonOpenModal> = (props) => {
    const {
        onOpenModal,
        className,
        text,
        backgroundColor = 'white',
        textColor = 'blue',
    } = props;

    return (
        <button
            className={`${className} inline-flex items-center rounded-md bg-${backgroundColor}-50 px-5 py-2 text-xs font-extrabold text-${textColor}-700 ring-1 ring-indigo-700/10 ring-inset`}
            onClick={onOpenModal}
        >
            {text}
        </button>
    );
};

export default ButtonOpenModal;