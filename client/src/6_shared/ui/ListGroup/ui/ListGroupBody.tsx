import {
    FC,
    ReactNode,
} from 'react';
import { GlobalColorEnum } from '../../../api/types/types';

interface PropsListGroupBody {
    text?: string;
    color?: GlobalColorEnum | string;
    children?: ReactNode;
}

const ListGroupBody: FC<PropsListGroupBody> = ({
    text,
    color = GlobalColorEnum.blue,
    children,
}) => {
    return (
        <li className={`w-full px-4 py-2 border-b border-${color}-200 rounded-t-lg dark:border-${color}-600`}>
            <div
                className={`w-full px-4 py-2 border-b border-${color}-200 rounded-t-lg dark:border-${color}-600`}
            >{text}</div>
            <div className='flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600'>
                {children}
            </div>
        </li>
    );
};

export default ListGroupBody;