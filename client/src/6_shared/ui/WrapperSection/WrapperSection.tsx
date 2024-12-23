import React, {
    PropsWithChildren,
} from 'react';

const WrapperSection = (props: PropsWithChildren) => {
    return (
        <div className='box-content border-4 border-teal-400 w-full'>
            <div className='h-full w-full'>
                {props.children}
            </div>
        </div>
    );
};

export default WrapperSection;