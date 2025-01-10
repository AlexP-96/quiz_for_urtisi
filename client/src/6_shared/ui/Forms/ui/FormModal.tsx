import {
    FC,
    FormEvent,
    ReactNode,
} from 'react';

interface PropsFormsModal {
    method?: string;
    children: ReactNode;

    submitForm(e: FormEvent<HTMLFormElement>): void;
}

const FormModal: FC<PropsFormsModal> = (props) => {
    const {
        method,
        children,
        submitForm,
    } = props;

    return (
        <form
            method={method}
            onSubmit={submitForm}
        >

            {children}
        </form>
    );
};

export default FormModal;