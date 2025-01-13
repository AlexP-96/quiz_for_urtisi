import {
    FC,
    FormEvent,
    Fragment,
    ReactNode,
} from 'react';

interface PropsFormsModal {
    method?: string;
    children: ReactNode;
    sectionButtons?: ReactNode[];

    submitForm?(e: FormEvent<HTMLFormElement>): void;
}

const FormModal: FC<PropsFormsModal> = (props) => {
    const {
        method,
        children,
        submitForm,
        sectionButtons,
    } = props;


    return (
        <form
            method={method}
            onSubmit={submitForm}
        >
            {children}
            <div
                className='mx-auto flex flex-wrap gap-2 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'
            >
                {sectionButtons}
            </div>
        </form>
    );
};

export default FormModal;