import {
    FC,
    ReactNode,
} from 'react';

interface PropsWrapperContent {
    children: ReactNode;
}

const WrapperContent: FC<PropsWrapperContent> = (props) => {
    const { children } = props;

    return (
        <div
            className='mx-auto flex flex-wrap gap-2 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'
        >
            {children}
        </div>
    );
};

export default WrapperContent;