import {EventHandler, FC, MouseEventHandler, PropsWithChildren, ReactNode, SyntheticEvent, useState} from 'react';

import {classNames} from '6_shared/lib/helpers/classNames/classNames';
import cls from './BlockRadioFilter.module.scss';
import {Text} from "6_shared/ui/Text/Text";
import {Input} from "../Inputs/ui/Input";

interface BlockRadioFilterProps extends PropsWithChildren {
    className?: string;
    titleFilter: string;
    arrValues?: string[];
}

interface IForm<T> {
    status: string;
    error: string[];
    fields: T;
}

export const BlockRadioFilter: FC<BlockRadioFilterProps> = ({className, titleFilter, arrValues}) => {

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
                    {
                        arrValues.map((value: string) => (
                            <div className={cls.asideInput}>
                                <label>
                                    {value}
                                    <Input
                                        type={'radio'}
                                        name={titleFilter}
                                        className={cls.inputFilter}
                                    />
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

