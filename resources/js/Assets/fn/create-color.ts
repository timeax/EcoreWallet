import Colors from "../colors";

export type ColorNames = keyof typeof Colors;

export type Color =
    | `rgb(var(--color-${ColorNames}))`
    | `rgb(var(--color-${ColorNames}-${string | number}))`
    | `rgb(var(--color-${ColorNames}) / ${number})`
    | `rgb(var(--color-${ColorNames}-${string | number}) / ${number})`;

export type ColorProp = Color | typeof color;

type ColorEffects = {
    value: Color;
    hover: Color;
    focus: Color;
    visited: Color;
    disabled: Color;
    text: Color
    //---------
} & CColorEffects;
type Keys = `${keyof ColorWeight}Color`;

type CColorEffects = {
    [P in Keys]?: Color
}

type Opacity = {
    [P in keyof ColorWeight]: number | string
}

type ColorWeight = {
    normal?: string | number;
    focus?: string | number;
    hover?: string | number;
    visited?: string | number;
    disabled?: string | number;
};

type ColorType = "text" | "background" | "border" | "shadow" | "gradiant";

type ColorObject = {
    color: Color;
    effects(): ColorEffects;
}

function color(t: 'background' | 'border' | 'text' | 'shadow', opacity?: Opacity): (name: ColorNames, weights?: ColorWeight) => ColorObject;
function color(t: 'gradient', opacity?: Opacity): (
    type: string,
    color: Array<{
        name: ColorNames;
        weight: ColorWeight;
        opactiy: Opacity
    }>,
) => ColorObject;

function color<T extends ColorType>(
    type: T,
    opacity?: Opacity
) {

    switch (type) {
        case "text": return (name: ColorNames, weights?: ColorWeight) =>
            textColor(name, weights, opacity);
        case "background":
        case "border": return (name: ColorNames, weights?: ColorWeight) => bgColor(name, weights, opacity);
        case "shadow": return (name: ColorNames, weights?: ColorWeight) => shadow(name, weights, opacity)
        case "gradiant": return (
            type: string,
            color: Array<{
                name: ColorNames;
                weight: ColorWeight;
                opactiy: Opacity
            }>,
        ) => gradiant(type, color)
    }
}

function hijack(name: ColorNames, type: ColorType, effect?: keyof ColorEffects, weight?: string | number, opactiy?: string | number): Color {
    if (type == 'text') {
        if (name == 'theme') {
            if (effect == 'text') return `rgb(var(--color-theme-button-text))`
            if (effect == 'hover') return `rgb(var(--color-theme-icons))`
            if (effect == 'focus') return `rgb(var(--color-theme-emphasis))`
        }
    }

    if (type === 'background') {
        if (name == 'theme') {
            if (!effect) return 'rgb(var(--color-theme-bgColor) / .7)';
            if (effect == 'hover') return 'rgb(var(--color-theme-bgColor))'
        }
    }
    return create(name, weight, opactiy);
}

function create(color: ColorNames, weight?: string | number, opacity?: number | string): Color {
    const percent = opacity ? ' / ' + opacity : '';
    //@ts-ignore
    if (weight) return `rgb(var(--color-${color}-${weight})${percent})`;
    //@ts-ignore
    return `rgb(var(--color-${color})${percent})`;
}

function textColor(name: ColorNames, weights: ColorWeight = {}, opacity: Opacity = {}): ColorObject {
    const { normal = 500, visited = 300, focus = 700, hover = 600, disabled = 200 } = weights;
    const { normal: oNormal, visited: oVisited, focus: oFocus, hover: oHover, disabled: oDisabled } = opacity;
    const base = create(name, normal, oNormal);
    return {
        color: base,
        effects() {
            return {
                value: base,
                visited: create(name, visited, oVisited),
                focus: create(name, focus, oFocus),
                hover: create(name, hover, oHover),
                disabled: create(name, disabled, oDisabled),
                text: base
            }
        },
    }
}

function bg(name: ColorNames): ColorWeight {
    switch (name) {
        case "primary": return {
            normal: 800,
            disabled: 200,
            focus: 900,
            hover: 900,
            visited: 300
        };
        case "secondary":
        case "danger":
        case "warning":
        case "info":
        case "success":
        case "theme":
        default: return {
            normal: 500,
            disabled: 200,
            focus: 700,
            hover: 600,
            visited: 300
        }
    }
}


function bgColor(name: ColorNames, weights: ColorWeight = {}, opacity: Opacity = {}): ColorObject {
    const dw = bg(name);
    const { normal = dw.normal, visited = dw.visited, focus = dw.focus, hover = dw.hover, disabled = dw.disabled } = weights;
    const { normal: oNormal, visited: oVisited, focus: oFocus, hover: oHover, disabled: oDisabled } = opacity;
    const base = hijack(name, 'background', undefined, normal, oNormal);
    return {
        color: base,
        effects() {
            return {
                value: base,
                visited: hijack(name, 'background', 'visited', visited, oVisited),
                focus: hijack(name, 'background', 'focus', focus, oFocus),
                hover: hijack(name, 'background', 'hover', hover, oHover),
                disabled: hijack(name, 'background', 'disabled', disabled, oDisabled),
                //-------
                focusColor: hijack(name, 'text', 'focus', disabled, oDisabled),
                visitedColor: hijack(name, 'text', 'visited', disabled, oDisabled),
                hoverColor: hijack(name, 'text', 'hover', disabled, oDisabled),
                disabledColor: hijack(name, 'text', 'disabled', disabled, oDisabled),
                text: hijack(name, 'text', 'text', name == 'theme' ? undefined : 200)
            }
        },
    }
}

function gradiant(type: string, colors: { name: ColorNames; weight: ColorWeight; opactiy: Opacity; }[]) {
    throw new Error("Function not implemented.");
}



function shadow(name: ColorNames, weights: ColorWeight = {}, opacity: Opacity = {}) {
    const { normal = 500, visited = 300, focus = 700, hover = 600, disabled = 200 } = weights;
    const { normal: oNormal, visited: oVisited, focus: oFocus, hover: oHover, disabled: oDisabled } = opacity;

    return {
        color: create(name, normal, oNormal || '.2'),
        effects() {
            return {
                value: create(name, normal, oNormal || '.2'),
                visited: create(name, visited, oVisited || '.2'),
                focus: create(name, focus, oFocus || '.2'),
                hover: create(name, hover, oHover || '.2'),
                disabled: create(name, disabled, oDisabled || '.2')
            }
        },
    }
}

export { textColor, color, create, gradiant, shadow, bgColor };
