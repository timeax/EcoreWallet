import { routeByHref } from '@routes/index';
import { classNames } from 'primereact/utils';
import React from 'react';
import styles from '@styles/layout/section.module.scss';
import Tag from '@components/index';

const ClassicSections: React.FC<ClassicSectionsProps> = ({ children = ['', ''], className = '', id }) => {
    //--- code here ---- //
    const [section1, section2] = children;
    //@ts-ignore
    const routeClasses = routeByHref(route().current() as string)?.className || styles.default;
    //----------
    return (
        <div className={classNames(className, routeClasses)}>
            <Tag element={'div'} id={id} className={classNames('flex', styles.main)}>
                <div data-section='classic-light'>
                    {section1}
                </div>
                <div data-section='classic-dark'>
                    {section2}
                </div>
            </Tag>
        </div>
    );
}

interface ClassicSectionsProps {
    children?: [React.ReactNode, React.ReactNode];
    className?: string
    id?: string
}

export default ClassicSections
