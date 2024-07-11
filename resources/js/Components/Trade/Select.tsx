import React, { useEffect, useRef, useState } from 'react';
import { Container } from '.';
import Dropdown from '@components/Dropdown';
import { Button } from 'primereact/button';
import { FaChevronDown } from 'react-icons/fa';
import { IoCheckmark } from 'react-icons/io5';
import { create } from '@assets/fn/create-color';


function Select<R = any>(props: SelectProps<R>) {
    const [selected, setSelected] = useState<R | undefined>(props.value);
    const [state, setState] = useState(props.value);

    const button = useRef<HTMLButtonElement>();
    useEffect(() => {
        //@ts-ignore
        if (props.value?.[props.unique] === selected?.[props.unique]) return;
        if (props.value) setSelected(props.value);
    }, [state]);

    return (
        <Container outlined={props.outlined} container={props.container} className={props.className}>
            <div className='flex justify-between'>
                <div className='flex items-center grow' {...(props.quick ? {
                    onClick: () => {
                        let btn = button.current?.parentElement;
                        if (btn && !btn.classList.contains('open')) btn.click();
                    }
                } : {})}>
                    {
                        selected
                            ? props.contentTemplate(selected) : props.placeholder || 'Make Selection'
                    }
                </div>
                <div className='self-center items-center flex'>
                    <Dropdown className='!static'>
                        <Dropdown.Trigger>
                            <Button onClick={(e) => e.preventDefault()} ref={button as any} className={props.trigger || ''} icon={<FaChevronDown />} rounded />
                        </Dropdown.Trigger>
                        <Dropdown.Content width='w-full'>
                            {props.items.map((item, index) => {
                                return (
                                    <Dropdown.Link key={index} onClick={(e) => {
                                        setSelected(item);
                                        props.onSelect?.({ ...e, value: item })
                                    }}>
                                        <div className="flex justify-between items-center">
                                            <div className="grow">
                                                {props.menuItemTemplate(item)}
                                            </div>
                                            {
                                                //@ts-ignore
                                                item[props.unique] === selected?.[props.unique]
                                                    ? <span><IoCheckmark fontSize={'20px'} color={create('success')} /></span>
                                                    : ''
                                            }
                                        </div>
                                    </Dropdown.Link>
                                )
                            })}
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </Container>
    );
}




export interface SelectProps<T = any> extends AppElement {
    contentTemplate: React.FC<T>,
    menuItemTemplate: React.FC<T>,
    value?: T,
    unique: string;
    onSelect?(value: React.MouseEvent & { value: T }): void;
    items: T[];
    quick?: boolean;
    placeholder?: React.ReactNode
    outlined?: boolean;
    container?: string;
    trigger?: string;
}

export default Select
