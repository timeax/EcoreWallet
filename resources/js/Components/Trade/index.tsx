import Card from "@components/Card"
import Text from "@components/Text"
import { classNames } from "primereact/utils"

export const Title: React.FC<TitleProps> = ({ md, children, light, sm, bold, bright, medium, lg, noPad, xl, caps, upper, normal, className }) => {
    if (!upper && !caps && !normal) caps = true
    return <Text variant={'other'} className={classNames('text-[13px] flex items-center', className, {
        'font-semibold': bold,
        'font-medium': medium,
        'font-normal': light,
        'text-theme-emphasis': !bright,
        'text-theme-icons': bright,
        'text-[14px]': md,
        'text-[13px]': sm,
        'text-[15px]': lg,
        'text-[17px]': xl,
        'pl-0': noPad,
        'pl-3': !noPad,
        'uppercase': upper,
        'capitalize': caps,
        'normal-case': normal,
    })}>{children}</Text>
}

interface TitleProps {
    bold?: boolean,
    children: React.ReactNode,
    className?: string,
    bright?: boolean,
    medium?: boolean,
    md?: boolean,
    lg?: boolean,
    noPad?: boolean
    light?: boolean;
    sm?: boolean
    xl?: boolean;
    caps?: boolean;
    upper?: boolean;
    normal?: boolean;
}

export const Container: React.FC<{ children: React.ReactNode, outlined?: boolean, className?: string, container?: string }> = ({ outlined, children, className = '', container = '!py-3 !px-3' }) => {
    return <Card
        className={classNames('relative', className, {
            '!bg-transparent border border-theme-icons/25': outlined
        })}
        container={container}>
        {children}
    </Card>
}
