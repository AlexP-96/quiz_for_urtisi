import React, { FC } from 'react';
import { GlobalColorEnum } from '../../../api/types/types';

interface PropsButtonPopUpModal {
    idPopUpTarget: string;
    text: string;
    type: 'submit' | 'reset' | 'button';
    color?: GlobalColorEnum | string;
    id? : string | number;
    handlerClick?(answerId: {}): void;
}

const BtnPopUpOpenModal: FC<PropsButtonPopUpModal> = (props) => {
    const {
        idPopUpTarget,
        text,
        color,
        type,
        handlerClick,
        id
    } = props;

    const returnAnswerId = () => {
        if(handlerClick) {
            handlerClick(id);
        }
    };

    return (
        <button
            data-modal-target={idPopUpTarget}
            data-modal-toggle={idPopUpTarget}
            onClick={returnAnswerId}
            className={`block text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`}
            type={type}
        >
            {text}
        </button>
    );
};

export default BtnPopUpOpenModal;