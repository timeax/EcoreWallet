// @ts-nocheck
import { PrimeReactPTOptions } from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';
import carousel from "./carousel";
import button from "./button";
import { classNames } from "primereact/utils";
import tab from '@styles/components/tabview.module.scss'
import dashboard from '@styles/pages/dashboard.module.scss';


export function classList(options: any = {}): string[] {
    const data: string[] = options
        .props
        ?.className
        ?.split?.(' ')
        .map(item => item.trim())
        .filter(item => item) || [];

    return {
        has(key: string) {
            return data.includes(key)
        }
    }
}

const AppTheme: PrimeReactPTOptions = {
    carousel,
    button,
    datatable: {
        headerContent: 'flex items-center'
    },

    tabview: {
        nav(options) {
            const list = classList(options);
            return classNames('flex relative mb-2', {
                [dashboard.nav]: list.has('db-classic')
            })
        },

        inkbar(options) {
            const list = classList(options);
            let isDashboard = list.has('db-classic');
            //-------
            return classNames({
                [dashboard.inkbar]: isDashboard,
                [tab.inkbar]: !isDashboard
            })
        },
    },

    tabpanel: {
        headerAction(options) {
            const list = classList(options);
            const active = options.tabpanel?.context?.active;

            return classNames(tab.tabLink, {
                [dashboard.tabLink]: list.has('db-classic'),
                [dashboard.active]: active && list.has('db-classic')
            })
        },

        header(options) {
            const list = classList(options);
            return classNames(tab.tab, {
                [dashboard.tab]: list.has('db-classic')
            })
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
                className: classNames('rounded-lg shadow-lg border-0 flex flex-col', 'max-h-[90%] transform scale-100', 'm-0 w-[50vw]', 'dark:border dark:border-blue-900/40', {
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
                className: classNames('overflow-y-auto grow', 'bg-theme-bgColor px-6 pb-8 pt-0', {
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

    toast: {
        root: {
            className: classNames('w-96', 'opacity-90')
        },
        message: function message(_ref23) {
            var state = _ref23.state,
                index = _ref23.index;
            return {
                className: classNames('my-4 rounded-md w-full', {
                    'bg-info-100 border-solid border-0 border-l-4 border-blue-500 text-blue-700': state.messages[index] && state.messages[index].message.severity == 'info',
                    'bg-greensuccess-100 border-solid border-0 border-l-4 border-green-500 text-green-700': state.messages[index] && state.messages[index].message.severity == 'success',
                    'bg-warning-100 border-solid border-0 border-l-4 border-orange-500 text-orange-700': state.messages[index] && state.messages[index].message.severity == 'warn',
                    'bg-danger-100 border-solid border-0 border-l-4 border-red-500 text-red-700': state.messages[index] && state.messages[index].message.severity == 'error'
                })
            };
        },
        content: 'flex items-center py-5 px-7',
        icon: {
            className: classNames('w-6 h-6', 'text-lg mr-2')
        },
        text: 'text-sm font-light flex flex-col flex-1 grow shrink ml-4',
        summary: 'font-medium block',
        detail: 'mt-1 block',
        closeButton: {
            className: classNames('w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out', 'ml-auto overflow-hidden relative', 'flex items-center justify-center', 'hover:bg-white/30')
        },
        transition: {
            timeout: {
                enter: 300,
                exit: 1000
            },
            classNames: {
                enter: 'opacity-0 max-h-0 translate-x-0 translate-y-2/4 translate-z-0',
                enterActive: '!max-h-40 !opacity-90 !translate-y-0 transition-transform transition-opacity duration-300',
                exit: 'max-h-40 opacity-90',
                exitActive: '!max-h-0 !opacity-0 !mb-0 overflow-hidden transition-all duration-1000 ease-in'
            }
        }
    },
    message: {
        root: function root(_ref22) {
            var props = _ref22.props;
            return {
                className: classNames('inline-flex items-center justify-center align-top', 'p-2 m-0 rounded-md', {
                    'bg-info-100 border-0 text-info-700': props.severity == 'info',
                    'bg-success-100 border-0 text-success-700': props.severity == 'success',
                    'bg-warning-100 border-0 text-warning-700': props.severity == 'warn',
                    'bg-danger-100 border-0 text-danger-700': props.severity == 'error'
                })
            };
        },
        icon: 'text-base mr-2'
    },
    messages: Tailwind.messages,
    avatar: Tailwind.avatar,
    checkbox: Tailwind.checkbox,
    toolbar: Tailwind.toolbar,
    progressspinner: Tailwind.progressspinner
}

export default AppTheme;
