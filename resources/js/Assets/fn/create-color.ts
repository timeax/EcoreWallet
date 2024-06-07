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
    //---------
} & CColorEffects;
type Keys = `${keyof ColorWeight}Color`;

type CColorEffects = {
    [P in Keys]?: Color
}

type Opacity = {
    [P in keyof ColorWeight]: number
}

type ColorWeight = {
    normal?: string;
    focus?: string;
    hover?: string;
    visited?: string;
    disabled?: string;
};

type ColorType = "text" | "background" | "border" | "shadow" | "gradiant";

type ColorObject = {
    color: Color;
    effects(): ColorEffects;
}


function color(
    type: ColorType,
    opacity: Opacity
) {
    if (type === "text")
        return (name: ColorNames, weights?: ColorWeight) =>
            textColor(name, weights, opacity);
    if (type === 'background' || type == 'border') return (name: ColorNames, weights?: ColorWeight) => bgColor(name, weights, opacity);

    if (type === 'gradiant') return (
        type: string,
        color: Array<{
            name: ColorNames;
            weight: ColorWeight;
            opactiy: Opacity
        }>,
    ) => gradiant(type, color)
}

function create(color: ColorNames, weight?: string | number, opacity?: number): Color {
    const percent = opacity ? ' / ' + opacity : '';
    //@ts-ignore
    if (weight) return `rgb(var(--color-${color}-${weight})${percent})`;
    //@ts-ignore
    return `rgb(var(--color-${color})${percent})`;
}

function textColor(name: ColorNames, weights: ColorWeight = {}, opacity: Opacity = {}): ColorObject {
    const { normal = 500, visited = 300, focus = 700, hover = 600, disabled = 200 } = weights;
    const { normal: oNormal, visited: oVisited, focus: oFocus, hover: oHover, disabled: oDisabled } = opacity;
    return {
        color: create(name, normal, oNormal),
        effects() {
            return {
                value: create(name, normal, oNormal),
                visited: create(name, visited, oVisited),
                focus: create(name, focus, oFocus),
                hover: create(name, hover, oHover),
                disabled: create(name, disabled, oDisabled)
            }
        },
    }
}

function bgColor(name: ColorNames, weights: ColorWeight = {}, opacity: Opacity = {}): ColorObject {
    const { normal = 500, visited = 300, focus = 700, hover = 600, disabled = 200 } = weights;
    const { normal: oNormal, visited: oVisited, focus: oFocus, hover: oHover, disabled: oDisabled } = opacity;
    return {
        color: create(name, normal, oNormal),
        effects() {
            return {
                value: create(name, normal, oNormal),
                visited: create(name, visited, oVisited),
                focus: create(name, focus, oFocus),
                hover: create(name, hover, oHover),
                disabled: create(name, disabled, oDisabled)
            }
        },
    }
}

function gradiant(type: string, colors: { name: ColorNames; weight: ColorWeight; opactiy: Opacity; }[]) {
    throw new Error("Function not implemented.");
}

export { textColor, color, create, gradiant };


