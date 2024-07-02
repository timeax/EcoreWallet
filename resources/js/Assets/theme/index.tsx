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
        headerContent: 'flex items-center'
    },

    tabview: {
        nav(options) {
            return 'flex relative mb-2'
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
    },

    selectbutton: {
        root: tab.selectRoot,
        button(options) {
            return {
                className: classNames(tab.selectbutton,
                    {
                        [tab.activeButton]: options?.context.selected
                    }
                )
            }
        },
    },

    dialog: {
        root: function root(_ref13) {
            var state = _ref13.state;
            return {
                className: classNames('rounded-lg shadow-lg border-0', 'max-h-[90%] transform scale-100', 'm-0 w-[50vw]', 'dark:border dark:border-blue-900/40', {
                    'transition-none transform-none !w-screen !h-screen !max-h-full !top-0 !left-0': state.maximized
                })
            };
        },
        header: {
            className: classNames('flex items-center justify-between shrink-0', 'bg-theme-bgColor border-t-0  rounded-tl-lg rounded-tr-lg p-6')
        },
        headerTitle: 'font-bold text-md',
        headerIcons: 'flex items-center',
        closeButton: {
            className: classNames('flex items-center justify-center overflow-hidden relative', 'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0', 'hover:text-danger-50 hover:border-transparent hover:bg-danger-200', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_var(--color-danger-600)]',
            )
        },
        closeButtonIcon: 'w-4 h-4 inline-block',
        content: function content(_ref14) {
            var props = _ref14.props,
                state = _ref14.state;
            return {
                className: classNames('overflow-y-auto', 'bg-theme-bgColor px-6 pb-8 pt-0', {
                    'rounded-bl-lg rounded-br-lg': !props.footer
                }, {
                    grow: state.maximized
                })
            };
        },
        footer: {
            className: classNames('flex gap-2 shrink-0 justify-end align-center', 'border-t-0 bg-theme-bgColor px-6 pb-6 text-right rounded-b-lg')
        },
        mask: function mask(_ref15) {
            var state = _ref15.state;
            return {
                className: classNames('transition duration-200', {
                    'bg-black/40': state.containerVisible
                })
            };
        },
        transition: function transition(_ref16) {
            var props = _ref16.props;
            return {
                timeout: 200,
                classNames: props.position === 'top' ? {
                    enter: 'opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0',
                    enterActive: '!opacity-100 !scale-100 !translate-y-0 transition-all duration-200 ease-out',
                    exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
                    exitActive: '!opacity-0 !scale-75 translate-x-0 -translate-y-full translate-z-0'
                } : props.position === 'bottom' ? {
                    enter: 'opacity-0 scale-75 translate-y-full',
                    enterActive: '!opacity-100 !scale-100 !translate-y-0 transition-all duration-200 ease-out',
                    exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
                    exitActive: '!opacity-0 !scale-75 translate-x-0 translate-y-full translate-z-0'
                } : props.position === 'left' || props.position === 'top-left' || props.position === 'bottom-left' ? {
                    enter: 'opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0',
                    enterActive: '!opacity-100 !scale-100 !translate-x-0 transition-all duration-200 ease-out',
                    exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
                    exitActive: '!opacity-0 !scale-75 -translate-x-full translate-y-0 translate-z-0'
                } : props.position === 'right' || props.position === 'top-right' || props.position === 'bottom-right' ? {
                    enter: 'opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0',
                    enterActive: '!opacity-100 !scale-100 !translate-x-0 transition-all duration-200 ease-out',
                    exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
                    exitActive: '!opacity-0 !scale-75 translate-x-full translate-y-0 translate-z-0'
                } : {
                    enter: 'opacity-0 scale-75',
                    enterActive: '!opacity-100 !scale-100 transition-all duration-200 ease-out',
                    exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
                    exitActive: '!opacity-0 !scale-75'
                }
            };
        }
    },

    toast: Tailwind.toast,
    message: Tailwind.message,
    messages: Tailwind.messages
}

export default AppTheme;
