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
function Select<R = SelectDefs>({ items, textColor: cl = '', menuGap, color: colorName = 'success', marker = 'tick', gap, label = 'label', variant = 'contain', sx, menuItemTemplate = MenuItemTemplate as any, contentTemplate = ContentTemplate as any, menu = label, ...props }: SelectProps<R>) {
    const [selected, setSelected] = useState<R | undefined>(props.value);
    const [prev] = useState(props.value);

    const button = useRef<HTMLButtonElement>();
    const isOpen = useRef<boolean>(false);

    useEffect(() => {
        if (!props.value) return;
        if (props.unique == '...') {
            if (props?.value == prev) return;
        } else
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
            <Tag element='div' {...(props.quick ? {
                onClick: () => {
                    if (isOpen.current) return;
                    let btn = button.current;
                    if (btn) btn.click();
                }
            } : {})} column-gap={gap ? gap + 'px' : undefined} className='flex items-center justify-between'>
                <Tag element='div' color={textColor} className='flex items-center grow cursor-pointer'>
                    {
                        selected
                            ? contentTemplate(selected, label) : props.placeholder || 'Make Selection'
                    }
                </Tag>
                <div className='self-center items-center flex'>
                    <Dropdown
                        //@ts-ignore
                        dropRef={isOpen} className='!static'>
                        <Dropdown.Trigger tagRef={button} mute={props.quick}>
                            <Tag data-section={'trigger-btn'} element='span' color={textColor} className={props.trigger}>{props.icon || <FaChevronDown />}</Tag>
                        </Dropdown.Trigger>
                        <Dropdown.Content width={classNames('w-full max-h-[350px] overflow-auto', props.content)}>
                            {items.map((item, index) => {
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
    /**Selected view template */
    contentTemplate?: React.FC<T>,
    /**Drop menu view template */
    menuItemTemplate?: React.FC<T>,
    items: T[];
    /**Default value */
    value?: T,
    /**Unique identifier */
    unique: keyof T;
    onSelect?(value: React.MouseEvent & { value: T }): void;
    /**Show dropmenu when click event occurs anywhere on the select button */
    quick?: boolean;
    placeholder?: React.ReactNode
    /**Trigger icon className */
    trigger?: string
    /**Trigger icon  */
    icon?: React.ReactNode;
    /**Dropmenu className */
    content?: string;
    sx?: SxProps;
    variant?: 'outline' | 'contain' | 'none';
    transaparent?: boolean;
    contained?: boolean;
    /**Change identifier for label selection when items is not defined in props
     * @default label
     */
    label?: keyof T;
    /**Space between trigger icon and selected item */
    gap?: number;
    /**Space between menu content and selection identifier */
    menuGap?: number;
    marker?: 'tick' | 'background' | 'dot';
    color?: ColorNames;
    textColor?: string;
    /**Change identifier for value selection when items is not defined in props
     * @default menu whatever label is
     */
    menu?: string
}

export default Select
