import React, { FC } from 'react';
import BtnPopUpOpenModal from '../../Buttons/ui/BtnPopUpOpenModal';
import PopUpModal from '../../Modals/ui/PopUpModal';

interface PropsAccordion {
    title?: string;
    children?: React.ReactNode;
    id?: string | number;
    firstIndex?: number;
    questionId?: string | number;

    openModal({}: { questionId: number | string }): void;
}

enum IdModal {
    deleteAnswer = 'modal-delete-answer-',
    createAnswer = 'modal-create-answer-'
}

const Accordion: FC<PropsAccordion> = (props) => {
    const {
        title,
        children,
        id,
        firstIndex,
        openModal,
    } = props;

    const handlerClick = () => {
        if (props.openModal) {
            props.openModal({
                questionId: props.id,
            });
        }
    };
    return (
        <>
            <PopUpModal
                idModal={IdModal.deleteAnswer + id}
                textAccept={'Да удалить'}
                textCancel={'Отмена'}
                handlerAccept={handlerClick}
            >
                Вы действительно хотите удалить ответ
            </PopUpModal>
            <h2 id={`accordion-collapse-heading-${id}`}>
                <button
                    type='button'
                    className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 ${firstIndex === 0
                        ? 'rounded-t-xl'
                        : ''} focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
                    data-accordion-target={`#accordion-collapse-body-${id}`}
                    aria-expanded='true'
                    aria-controls={`accordion-collapse-body-${id}`}
                >
                    <span>{title}</span>
                    <svg
                        className='w-3 h-3 rotate-180 shrink-0'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 10 6'
                    >
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 5 5 1 1 5'
                        />
                    </svg>
                </button>
            </h2>
            <div
                id={`accordion-collapse-body-${id}`}
                className='hidden'
                aria-labelledby={`accordion-collapse-heading-${id}`}
            >
                <div className='p-5 border border-b-0 border-gray-200 dark:border-gray-700'>
                    {children}
                    <button
                        onClick={handlerClick}
                        className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                    >
                        Создать ответ
                    </button>

                    <BtnPopUpOpenModal
                        popUpTarget={IdModal.deleteAnswer + id}
                        text='Удалить ответ'
                    />
                    <button
                        className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                    >
                        Удалить ответ
                    </button>
                </div>
            </div>
        </>
    );
};

export default Accordion;