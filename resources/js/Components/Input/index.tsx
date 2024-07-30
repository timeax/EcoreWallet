import React, { useState } from 'react';
import { InputText } from "primereact/inputtext";
import Text from '../Text';
import Tag, { PropsWithSx } from '@components/index';
import { FloatLabel } from "primereact/floatlabel";
import styles from '@styles/components/inputs.module.scss'
import { showIf } from '@assets/fn';
import { PiEyeClosed, PiEyeThin } from 'react-icons/pi';
import { classNames } from 'primereact/utils';

const Textfield: React.FC<TextfieldProps> = ({ className, label, floatLabel, onChange, desc, descId, errorText, id, htmlFor, sx, type, inputElement = InputText, ...props }) => {
    //--- code here ---- //
    const [show, setShow] = useState(false);
    return (
        <Tag element={floatLabel ? FloatLabel : 'div'} id={id} className={"flex flex-col gap-1 " + className} sx={sx}>
            {label ? <Tag fontSize={'14px'} element={'label'} color='rgb(var(--color-theme-title))' className='font-medium' htmlFor={htmlFor}>{label} {showIf(props.required, <span className='text-danger-300'>*</span>)}</Tag> : ''}
            {/* @ts-ignore */}
            <div className='relative h-fit'>
                <Tag element={inputElement} type={classNames(type, {
                    'text': type == 'password' && show
                })} data-section='input' className={styles.textfield} id={htmlFor} aria-describedby={descId} onChange={onChange} {...props} />
                {/* === */}
                {showIf(type == 'password', <Tag onClick={() => setShow(!show)} element='div' sx={{
                    position: 'absolute',
                    height: '100%',
                    'right': 0,
                    'top': 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 10px'
                }}>{showIf(show, <PiEyeClosed />, <PiEyeThin />)}</Tag>)}
            </div>
            {desc ? <small id={descId}>{desc}</small> : ''}

            {errorText ? <Text className='!text-danger-700 !font-medium' variant="small">{errorText}</Text> : ''}
        </Tag>
    );
}

type StringNode = string | React.ReactNode;
//@ts-ignore
interface TextfieldProps extends AppElement<React.InputHTMLAttributes<HTMLInputElement>>, PropsWithSx {
    desc?: StringNode;
    label?: StringNode;
    errorText?: StringNode;
    descId?: string;
    floatLabel?: boolean;
    htmlFor?: string;
    inputElement?: any;
    onChange: React.ChangeEventHandler<HTMLInputElement>
    // onChange?(ev: React.ChangeEventHandler<HTMLInputElement>): void
}

export default Textfield
