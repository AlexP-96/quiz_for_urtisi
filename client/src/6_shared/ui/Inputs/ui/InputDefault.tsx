import React, {
    FC,
    SyntheticEvent,
} from 'react';

interface PropsInputDefault {
    text: string;
    value: string;

    changeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
}

const InputDefault: FC<PropsInputDefault> = (props) => {
    const {
        changeEvent,
        text,
        value
    } = props;

    const changedText = () => text.replace(' ', '')

    return (
        <div className='mb-6'>
            <label
                htmlFor={`default-input-${changedText}`}
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >{text}</label>
            <input
                type='text'
                onChange={changeEvent}
                id={`default-input-${changedText}`}
                value={value}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
        </div>
    );
};

export default InputDefault;