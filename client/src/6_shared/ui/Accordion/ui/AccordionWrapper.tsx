import React, { FC } from 'react';

interface PropsAccordionWrapper {
    children: React.ReactNode;
}

const AccordionWrapper: FC<PropsAccordionWrapper> = ({ children }) => {
    return (
        <div
            id='accordion-collapse'
            data-accordion='open'
        >
            {children}
        </div>
    );
};

export default AccordionWrapper;