import React from 'react';
import { InputText } from "primereact/inputtext";
import Text from '../Text';
import Tag, { PropsWithSx } from '@components/index';
import { FloatLabel } from "primereact/floatlabel";
import styles from '@styles/components/inputs.module.scss'

const Textfield: React.FC<TextfieldProps> = ({ className, label, floatLabel, onChange, desc, descId, errorText, id, htmlFor, sx, ...props }) => {
    //--- code here ---- //
    return (
        <Tag element={floatLabel ? FloatLabel : 'div'} id={id} className={"flex flex-col gap-1 " + className} sx={sx}>
            {label ? <Tag fontSize={'14px'} element={'label'} color='rgb(var(--color-theme-title))' className='font-medium' htmlFor={htmlFor}>{label}</Tag> : ''}
            {/* @ts-ignore */}
            <Tag element={InputText} className={styles.textfield} id={htmlFor} aria-describedby={descId} onChange={onChange} {...props} />
            {desc ? <small id={descId}>{desc}</small> : ''}

            {errorText ? <Text className='!text-danger-700 !font-medium' variant="small">{errorText}</Text> : ''}
        </Tag>
    );
}

type StringNode = string | React.ReactNode;

interface TextfieldProps extends AppElement<React.InputHTMLAttributes<HTMLInputElement>>, PropsWithSx {
    desc?: StringNode;
    label?: StringNode;
    errorText?: StringNode;
    descId?: string;
    floatLabel?: boolean;
    htmlFor?: string;
    // onChange?(ev: React.ChangeEventHandler<HTMLInputElement>): void
}

export default Textfield
