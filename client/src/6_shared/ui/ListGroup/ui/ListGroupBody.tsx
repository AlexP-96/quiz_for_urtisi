import React, { FC } from 'react';
import { GlobalColorEnum } from '../../../api/types/types';

interface PropsListGroupBody {
    text: string;
    color?: GlobalColorEnum | string;
}

const ListGroupBody: FC<PropsListGroupBody> = ({
    text,
    color = GlobalColorEnum.blue,
}) => {
    return (
        <li className={`w-full px-4 py-2 border-b border-${color}-200 rounded-t-lg dark:border-${color}-600`}>
            <div
                className={`w-full px-4 py-2 border-b border-${color}-200 rounded-t-lg dark:border-${color}-600`}
            >{text}</div>
        </li>
    );
};

export default ListGroupBody;