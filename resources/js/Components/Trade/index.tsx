import Card from "@components/Card"
import Text from "@components/Text"
import { classNames } from "primereact/utils"
import { forwardRef, ForwardRefRenderFunction } from "react"

export const Title = forwardRef<HTMLParagraphElement, TitleProps>(({ md, none, children, light, xs, sm, bold, bright, brighter, medium, lg, noPad, xl, white,
    "xl2": subheader,
    "xl3": header,
    "xl4": subtitle,
    "xl5": title,
    caps, upper, normal, className, ...props }, ref) => {
    if (!upper && !caps && !normal) caps = true
    return <Text variant={'other'} ref={ref} {...props} className={classNames('text-[13px] flex items-center', className, {
        'font-semibold': bold,
        'font-medium': medium,
        'font-normal': light,
        'text-theme-emphasis': !none,
        'text-theme-icons': bright,
        'text-theme-icons/60': brighter,
        'text-[14px]': md,
        'text-[13px]': sm,
        '!text-[11px]': xs,
        'text-[15px]': lg,
        'text-[17px]': xl,
        'text-[20px]': subheader,
        'text-[26px]': header,
        'text-[32px]': subtitle,
        'text-[36px]': title,
        'pl-0': noPad,
        'pl-3': !noPad,
        'uppercase': upper,
        'capitalize': caps,
        'normal-case': normal,
        'text-white': white,
    })}>{children}</Text>
}
)
interface TitleProps extends AppElement {
    bold?: boolean,
    children: React.ReactNode,
    bright?: boolean,
    brighter?: boolean,
    medium?: boolean,
    md?: boolean,
    lg?: boolean,
    noPad?: boolean
    light?: boolean;
    sm?: boolean
    xs?: boolean;
    xl?: boolean;
    'xl2'?: boolean;
    'xl3'?: boolean;
    'xl4'?: boolean;
    'xl5'?: boolean;
    caps?: boolean;
    upper?: boolean;
    normal?: boolean;
    white?: boolean;
    none?: boolean;
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
