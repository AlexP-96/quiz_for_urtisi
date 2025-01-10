import React, { FC } from 'react';
import { GlobalColorEnum } from '../../../api/types/types';

interface PropsAccordion {
    title?: string;
    children?: React.ReactNode;
    id?: string | number;
    firstIndex?: number;
    questionId?: string | number;
    color?: GlobalColorEnum | string;

    openModal({}: { questionId: number | string }): void;
}

const AccordionBody: FC<PropsAccordion> = (props) => {
    const {
        title,
        children,
        id,
        firstIndex,
        color = GlobalColorEnum.blue,
    } = props;

    return (
        <>
            <h2 id={`accordion-collapse-heading-${id}`}>
                <button
                    type='button'
                    className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-${color}-500 border border-b-0 border-${color}-200 ${firstIndex === 0
                        ? 'rounded-t-xl'
                        : ''} focus:ring-4 focus:ring-${color}-200 dark:focus:ring-${color}-800 dark:border-${color}-700 dark:text-${color}-400 hover:bg-${color}-100 dark:hover:bg-${color}-800 gap-3`}
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
                </div>
            </div>
        </>
    );
};

export default AccordionBody;