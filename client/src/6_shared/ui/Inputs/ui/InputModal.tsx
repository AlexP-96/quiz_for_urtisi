import React, {
    FC,
    Fragment,
} from 'react';

interface PropsInputDefault {
    labelText?: string;
    value: string;

    changeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
}

const InputModal: FC<PropsInputDefault> = (props) => {
    const {
        changeEvent,
        labelText,
        value,
    } = props;

    const changedText = () => labelText.replace(' ', '');

    return (
        <Fragment>
            <label
                htmlFor={`default-input-${changedText}`}
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >{labelText}</label>
            <input
                type='text'
                onChange={changeEvent}
                id={`default-input-${changedText}`}
                value={value}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
        </Fragment>
    );
};

export default InputModal;