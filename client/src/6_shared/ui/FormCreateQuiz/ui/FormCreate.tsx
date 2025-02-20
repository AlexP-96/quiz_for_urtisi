import React, { ChangeEvent } from 'react';
import { Input } from '../../Inputs/ui/Input';

type PropsForm = {
    submitForm(event: React.FormEvent<HTMLFormElement>): void;
    title: string;
    dispatchInput(event: ChangeEvent<HTMLInputElement>): void;
    valueInput: string
}

const FormCreate = ({
    submitForm,
    title,
    dispatchInput,
    valueInput
}: PropsForm) => {
    return (
        <form
            method='post'
            onSubmit={submitForm}
        >
            <h2 className='pb-6'>{title}</h2>
            <div className='flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600'>
                <Input
                    id='user_quiz'
                    name='user_quiz'
                    handleChange={dispatchInput}
                    type='text'
                    value={valueInput}
                    placeholder='Quiz'
                    className='block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6'
                />
            </div>
            <button
                type='submit'
                className='mt-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
                Создать
            </button>
        </form>
    );
};

export default FormCreate;