import { Spinner } from "flowbite-react";
import cls from './Spinner.module.scss';

export function SpinnerComponent() {
    //todo сделать красивый спиннер по центру экрана
    return (
        <div className={`flex flex-wrap items-center gap-2 mr-auto ml-auto ${cls.position}`}>
            <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
    );
}

export default SpinnerComponent;