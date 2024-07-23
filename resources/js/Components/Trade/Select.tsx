import React, { useEffect, useRef, useState } from 'react';
import { Container, Title } from '.';
import Dropdown from '@components/Dropdown';
import { FaChevronDown } from 'react-icons/fa';
import { IoCheckmark } from 'react-icons/io5';
import { ColorNames, bgColor, textColor, } from '@assets/fn/create-color';
import Button from '@components/Button';
import Tag, { SxProps } from '..';
import { classNames } from 'primereact/utils';
import styles from '@styles/components/select.module.scss';
import { showIf } from '@assets/fn';

interface SelectDefs {
    value: string;
    name?: string;
}

function MenuItemTemplate(props: SelectDefs, label?: string) {
    //@ts-ignore
    return <Title noPad>{props[label]}</Title>
}

function ContentTemplate(props: SelectDefs, label: string) {
    // @ts-ignore
    return <Title none data-section='title' noPad medium md>{props[label]}</Title>
}
//@ts-ignore
function Select<R = SelectDefs>({ textColor: cl = '', menuGap, color: colorName = 'success', marker = 'tick', gap, label = 'label', variant = 'contain', sx, menuItemTemplate = MenuItemTemplate as any, contentTemplate = ContentTemplate as any, menu = label, ...props }: SelectProps<R>) {
    const [selected, setSelected] = useState<R | undefined>(props.value);
    const [prev] = useState(props.value);

    const button = useRef<HTMLButtonElement>();

    useEffect(() => {
        if (!props.value) return;
        //@ts-ignore
        if (props?.value?.[props.unique] == prev?.[props.unique]) return;
        setSelected(props.value);
    }, [props.value]);

    const color = bgColor(colorName);
    const colorString = color.color;
    //-------
    const textColor = marker == 'background' ? color.effects().text : cl;

    return (
        <Tag sx={sx} element='div' className={classNames(props.className, styles.main, {
            'px-2 py-2 bg-theme-bgColor': props.contained,
            '!bg-transparent': props.transaparent
        })}>
            <Tag element='div' column-gap={gap ? gap + 'px' : undefined} className='flex items-center justify-between'>
                <Tag element='div' color={textColor} className='flex items-center grow' {...(props.quick ? {
                    onClick: () => {
                        let btn = button.current?.parentElement;
                        if (btn && !btn.classList.contains('open')) btn.click();
                    }
                } : {})}>
                    {
                        selected
                            ? contentTemplate(selected, label) : props.placeholder || 'Make Selection'
                    }
                </Tag>
                <div className='self-center items-center flex'>
                    <Dropdown className='!static'>
                        <Dropdown.Trigger>
                            <Tag element='span' color={textColor} onClick={(e: any) => e.preventDefault()} className={props.trigger}>{props.icon || <FaChevronDown />}</Tag>
                        </Dropdown.Trigger>
                        <Dropdown.Content width={classNames('w-full', props.content)}>
                            {props.items.map((item, index) => {
                                return (
                                    <Dropdown.Link key={index} onClick={(e) => {
                                        setSelected(item);
                                        props.onSelect?.({ ...e, value: item })
                                    }}>
                                        <Tag element='div' {
                                            ...(marker == 'background' ? {
                                                background: colorString,
                                                color: textColor
                                            } : {})
                                        } column-gap={menuGap ? menuGap + 'px' : undefined} className="flex justify-between items-center">
                                            <div className="grow">
                                                {menuItemTemplate(item, menu)}
                                            </div>
                                            {
                                                showIf(
                                                    //@ts-ignore
                                                    (item[props.unique] == selected?.[props.unique]) && ['dot', 'tick'].includes(marker),
                                                    <span className='flex items-center'>
                                                        {
                                                            marker == 'tick'
                                                                ? <IoCheckmark fontSize={'20px'} color={colorString} />
                                                                : marker == 'dot'
                                                                    ? <Tag element='span' borderColor={colorString} className={styles.dot}></Tag>
                                                                    : ''
                                                        }
                                                    </span>
                                                )
                                            }
                                        </Tag>
                                    </Dropdown.Link>
                                )
                            })}
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </Tag>
        </Tag>
    );
}




export interface SelectProps<T = any> extends AppElement {
    contentTemplate?: React.FC<T>,
    menuItemTemplate?: React.FC<T>,
    value?: T,
    unique: string;
    onSelect?(value: React.MouseEvent & { value: T }): void;
    items: T[];
    quick?: boolean;
    placeholder?: React.ReactNode
    trigger?: string
    icon?: React.ReactNode;
    content?: string;
    sx?: SxProps;
    variant?: 'outline' | 'contain' | 'none';
    transaparent?: boolean;
    contained?: boolean;
    label?: keyof T;
    gap?: number;
    menuGap?: number;
    marker?: 'tick' | 'background' | 'dot';
    color?: ColorNames;
    textColor?: string;
    menu?: string
}

export default Select
