import React, { FC } from 'react';
import { GlobalColorEnum } from '../../../api/types/types';

interface PropsBtnPopUpCloseModal {
    popUpTarget: string;
    text: string;
    type: 'submit' | 'reset' | 'button';
    color?: GlobalColorEnum | string;
}

const BtnPopUpCloseModal: FC<PropsBtnPopUpCloseModal> = (props) => {
    const {
        popUpTarget,
        text,
        color,
        type,
    } = props;

    return (
        <button
            data-modal-hide={popUpTarget}
            type={type}
            className={`text-white bg-${color}-600 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 dark:focus:ring-${color}-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
        >
            {text}
        </button>
    );
};

export default BtnPopUpCloseModal;