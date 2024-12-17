import { FC } from 'react';
import {
    Link,
    LinkProps,
} from 'react-router-dom';
import { classNames } from '6_shared/lib/helpers/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    Primary = 'primary',
    Secondary = 'secondary',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.Primary,
        ...otherProps
    } = props;
    return (
        <Link
            to={to}
            className={classNames(cls.appLink, { theme }, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
};
