import React, { FC } from 'react';

enum ColorText {
    red = 'red',
    blue = 'blue',
    green = 'green',
    yellow = 'yellow'
}

interface PropsButtonPopUpModal {
    popUpTarget: string;
    text: string;
    color?: ColorText | string;
}

const BtnPopUpOpenModal: FC<PropsButtonPopUpModal> = (props) => {
    const {
        popUpTarget,
        text,
        color,
    } = props;

    return (
        <button
            data-modal-target={popUpTarget}
            data-modal-toggle={popUpTarget}
            className={`block text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`}
            type='button'
        >
            {text}
        </button>
    );
};

export default BtnPopUpOpenModal;