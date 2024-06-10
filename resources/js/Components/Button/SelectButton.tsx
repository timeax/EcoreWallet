import React from 'react';
import { SelectButton as Toggles } from 'primereact/selectbutton';

const SelectButton: React.FC<SelectButtonProps> = () => {
    //--- code here ---- //
    return (
        <Toggles>

        </Toggles>
    );
}

interface SelectButtonProps {
    variant?: string;
    template: {};
    bgColor: string;
    buttonVariant?: 'contained' | 'outlined' | 'none';
}

export default SelectButton
