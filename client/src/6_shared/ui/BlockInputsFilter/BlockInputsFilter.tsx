import {EventHandler, FC, MouseEventHandler, PropsWithChildren, ReactNode, SyntheticEvent, useState} from 'react';

import {classNames} from '6_shared/lib/helpers/classNames/classNames';
import cls from './BlockInputsFilter.module.scss';
import {Text} from "6_shared/ui/Text/Text";
import {Input} from "../Inputs/ui/Input";

interface BlockInputsFilterProps extends PropsWithChildren {
    className?: string;
    titleFilter: string;
}

interface IForm<T> {
    status: string;
    error: string[];
    fields: T;
}

export const BlockInputsFilter: FC<BlockInputsFilterProps> = ({className, titleFilter}) => {

    const [showFilter, setShowFilter] = useState(false);

    const handlerShowFilter = () => {
        setShowFilter(!showFilter);
    }

    return (
        <div
            className={classNames(cls.wrapperInput, {}, [className])}
        >
            <h3
                className={cls.titleBlockFilter}
                onClick={handlerShowFilter}
            >
                {titleFilter}
            </h3>
            <div className={classNames(cls.asideInputsFilter, {[cls.showFilterPanel]: showFilter}, [])}>
                <div className={cls.inputBlockFilter}>
                    <Text className={cls.textInput}>
                        min
                    </Text>
                    <div className={cls.asideInput}>
                        <Input type={'number'} className={cls.inputFilter}/>
                    </div>
                </div>
                <div className={cls.inputBlockFilter}>
                    <Text className={cls.textInput}>
                        max
                    </Text>
                    <div className={cls.asideInput}>
                        <Input type={'number'} className={cls.inputFilter}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

