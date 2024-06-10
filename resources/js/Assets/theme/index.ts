// @ts-nocheck
import { PrimeReactPTOptions } from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';
import carousel from "./carousel";
import button from "./button";
import { classNames } from "primereact/utils";
import tab from '@styles/components/tabview.module.scss'

const AppTheme: PrimeReactPTOptions = {
    carousel,
    button,
    datatable: {
        root: (options) => ({
            className: classNames('relative', {
                'flex flex-col h-full': options?.props.scrollable && options?.props.scrollHeight === 'flex'
            })
        }),

        loadingoverlay: {
            className: classNames(
                'fixed w-full h-full t-0 l-0 bg-theme-bgContent/40',
                'transition duration-200',
                'absolute flex items-center justify-center z-2',
            )
        },
        loadingicon: 'w-8 h-8',
        wrapper: ({ props }) => ({
            className: classNames({
                relative: props.scrollable,
                'flex flex-col grow h-full': props.scrollable && props.scrollHeight === 'flex'
            })
        }),

        header: ({ props }) => ({
            className: classNames(
                'bg-slate-50 text-slate-700 border-gray-300 font-bold p-4',
                props.showGridlines ? 'border-x border-t border-b-0' : 'border-y border-x-0'
            )
        }),

        table: 'w-full border-spacing-0',
        thead: ({ context }) => ({
            className: classNames({
                'bg-slate-50 top-0 z-[1]': context.scrollable
            })
        }),
        tbody: ({ props, context }) => ({
            className: classNames({
                'sticky z-[1]': props.frozenRow && context.scrollable
            })
        }),
        tfoot: ({ context }) => ({
            className: classNames({
                'bg-slate-50 bottom-0 z-[1]': context.scrollable
            })
        }),
    },

    tabview: {
        nav(options) {
            return 'flex relative'
        },

        inkbar(options) {
            return tab.inkbar
        },
    },

    tabpanel: {
        headerAction(options) {
            return tab.tabLink
        },

        header(options) {
            return tab.tab
        },
    }
}

export default AppTheme;
