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
    return <Text variant={'other'} ref={ref} {...props} className={classNames('text-[0.813em] flex items-center', {
        'font-semibold': bold,
        'font-medium': medium,
        'font-normal': light,
        'text-theme-emphasis': !none,
        'text-theme-icons': bright,
        'text-theme-icons/60': brighter,
        'text-[0.875em]': md,
        'text-[0.813em]': sm,
        '!text-[0.688em]': xs,
        'text-[0.938em]': lg,
        'text-[1.063em]': xl,
        'text-[1.25em]': subheader,
        'text-[1.625em]': header,
        'text-[2em]': subtitle,
        'text-[2.25em]': title,
        'pl-0': noPad,
        'pl-3': !noPad,
        'uppercase': upper,
        'capitalize': caps,
        'normal-case': normal,
        'text-white': white,
    }, className)}>{children}</Text>
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
