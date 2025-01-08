import React, {FC, ReactElement, useEffect, useState} from 'react';

interface IPropsUseModal {
    element: ReactElement;
}

const useModal = (): [boolean, () => void] => {

    const [component, setComponent] = useState<boolean>(false);
    const makerBool = () => {
        setComponent(!component)
    };
    useEffect(() => {
        return () => {
            setComponent(false)
        }
    }, []);

    return [component, makerBool];
};

export default useModal;