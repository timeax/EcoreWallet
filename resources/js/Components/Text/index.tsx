
import Tag, { PropsWithSx } from "..";
import React, { forwardRef } from "react";
import styles from '@styles/components/text.module.scss';
import { Color } from "@assets/fn/create-color";

const Text = forwardRef<HTMLParagraphElement, TextProps>(({ variant = 'text', className = '', id, children, weight, size, sx, color, ...props }, ref) => {
    //--- code here ---- //
    const { element, styleName } = getVariant(variant);
    let css: StyledProps = {}
    if (weight) css.fontWeight = weight;
    if (color) css.color = color;
    if (size) css.fontSize = size;
    //----
    return (
        <Tag {...css} {...props} tagRef={ref} className={className + ' ' + styles[styleName]} id={id} sx={sx} element={element}>
            {children}
        </Tag>
    );
});

function getVariant(variant: TextProps['variant']): { element: ElementType<HTMLTags>, styleName: string } {
    switch (variant) {
        case 'title': return { element: 'h1', styleName: 'title' };
        case 'subtitle': return { element: 'h2', styleName: 'subtitle' };
        case 'heading': return { element: 'h3', styleName: 'heading' };
        case 'subheading': return { element: 'h4', styleName: 'subheading' };
        case 'text': return { element: 'p', styleName: 'text' };
        case 'small': return { element: 'small', styleName: 'small' };
        case 'header': return { element: 'h5', styleName: 'header' }
        case 'titlebar': return { element: 'h6', styleName: 'titlebar-title' }
        case 'other': return { element: 'span', styleName: 'other' }
    }

    return { element: variant as any, styleName: 'other' };
}

interface TextProps extends PropsWithSx, AppElement {
    variant?: "title" | "subtitle" | "heading" | "subheading" | "text" | "small" | 'header' | 'titlebar' | {};
    weight?: number | string;
    size?: string
    color?: Color
}

export default Text;
