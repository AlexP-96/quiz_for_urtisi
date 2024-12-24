import {
    Button,
    Checkbox,
    Label,
    TextInput,
} from 'flowbite-react';
import { FormEvent } from 'react';
import WrapperSection from '../../../6_shared/ui/WrapperSection/WrapperSection';

function RegisterPage() {
    const submitDataForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <WrapperSection>
            <form
                className='flex max-w-md flex-col gap-4 m-auto p-4 bg-transparent w-100 dark:bg-gray-800'
                onSubmit={submitDataForm}
            >
                Введите вашу почту и придумайте пароль человек
                <div>
                    <div className='mb-2 block'>
                        <Label
                            htmlFor='email'
                            value='Ваш email'
                        />
                    </div>
                    <TextInput
                        id='email'
                        type='email'
                        placeholder='Введите ваш email'
                        required
                    />
                </div>
                <div>
                    <div className='mb-2 block'>
                        <Label
                            htmlFor='password1'
                            value='Ваш пароль'
                        />
                    </div>
                    <TextInput
                        id='password'
                        type='password'
                        placeholder='Введите пароль'
                        required
                    />
                </div>
                <Button type='submit'>Отправить</Button>
            </form>
        </WrapperSection>
    );
}

export default RegisterPage;
