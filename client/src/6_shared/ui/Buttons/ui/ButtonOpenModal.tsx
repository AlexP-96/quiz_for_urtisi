import React, { FC } from 'react';

interface PropsButtonOpenModal {
    text: string;

    onOpenModal?: () => void;
}

const ButtonOpenModal: FC<PropsButtonOpenModal> = (props) => {
    const {
        onOpenModal,
        text,
    } = props;

    return (
        <button
            className='inline-flex items-center rounded-md bg-indigo-50 px-5 py-5 text-xs font-extrabold text-indigo-700 ring-1 ring-indigo-700/10 ring-inset'
            onClick={onOpenModal}
        >
            {text}
        </button>
    );
};

export default ButtonOpenModal;