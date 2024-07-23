import { DataTablePassThroughOptions } from "primereact/datatable";
import css from '@styles/pages/transactions.module.scss';
import Tailwind from 'primereact/passthrough/tailwind';
import { classNames } from "primereact/utils";


export const styles: DataTablePassThroughOptions = {
    root(options) {
        return css.root
    },

    table(options) {
        return css.main
    },

    //@ts-ignore
    headerContent: 'flex',
    paginator: {
        root: {
            className: classNames('flex items-center justify-center flex-wrap', 'bg-white text-gray-500 border-0 px-4 py-2 rounded-md', '' // Dark Mode
            )
        },

        current(options) {
            return {
                className: 'text-sm'
            }
        },

        firstPageButton: function firstPageButton(args) {
            var context = args?.context;
            return {
                className: classNames('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500  min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', '',
                    //Dark Mode
                    {
                        'cursor-default pointer-events-none opacity-60': context?.disabled,
                        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context?.disabled // Focus
                    })
            };
        },

        prevPageButton: function prevPageButton(args) {
            var context = args?.context;
            return {
                className: classNames('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', '',
                    //Dark Mode
                    {
                        'cursor-default pointer-events-none opacity-60': context?.disabled,
                        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context?.disabled // Focus
                    })
            };
        },

        nextPageButton: function nextPageButton(args) {
            var context = args?.context;
            return {
                className: classNames('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', '',
                    //Dark Mode
                    {
                        'cursor-default pointer-events-none opacity-60': context?.disabled,
                        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context?.disabled // Focus
                    })
            };
        },

        lastPageButton: function lastPageButton(args) {
            var context = args?.context;
            return {
                className: classNames('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', '',
                    //Dark Mode
                    {
                        'cursor-default pointer-events-none opacity-60': context?.disabled,
                        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context?.disabled // Focus
                    })
            };
        },

        pageButton: function pageButton(args) {
            var context = args?.context;
            return {
                className: classNames('text-sm relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[2.6rem] h-10 m-[0.143rem] rounded-full', 'transition duration-200', '',
                    // Dark Mode
                    'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
                    // Focus
                    {
                        'bg-blue-50 border-blue-50 text-blue-700 ': context?.active
                    })
            };
        },
        RPPDropdown: {
            root: function root(args) {
                var props = args?.props,
                    state = args?.state;
                return {
                    className: classNames('inline-flex items-center relative cursor-pointer user-none', 'bg-white border rounded-md', 'transition duration-200', 'h-10 mx-2', '',
                        //DarkMode
                        {
                            'outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] border-blue-500': state?.focused && !props?.disabled,
                            //Focus
                            'border-gray-300': !state?.focused,
                            'hover:border-blue-500': !props?.disabled //Hover
                        })
                };
            },

            input: {
                className: classNames('font-sans text-base text-gray-600 py-0 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border-0 pr-0', 'focus:outline-none focus:outline-offset-0', '' //Dark Mode
                )
            },

            trigger: {
                className: classNames('flex items-center justify-center shrink-0 px-2', 'text-gray-500 ')
            },
            panel: {
                className: classNames('bg-white text-gray-600 border-0 rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.1)]', '' //Dark Mode
                )
            },
            //@ts-ignore
            wrapper: 'overflow-auto',
            //@ts-ignore
            list: 'm-0 p-0 py-3 list-none',
            item: function item(args) {
                var context = args?.context;
                return {
                    className: classNames('relative font-normal cursor-pointer space-nowrap overflow-hidden', 'm-0 py-3 px-5 border-none text-gray-600 rounded-none', 'transition duration-200', '',
                        // Dark Mode
                        {
                            'text-blue-700 bg-blue-50 ': !context?.focused && context?.selected,
                            'bg-blue-300/40': context?.focused && context?.selected,
                            'text-gray-600 bg-gray-300 ': context?.focused && !context?.selected
                        })
                };
            }
        },
        JTPInput: {
            //@ts-ignore
            root: 'inline-flex mx-2',
            input: {
                //@ts-ignore
                className: classNames('font-sans text-base text-gray-600 py-2 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border border-gray-300 pr-0', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] focus:border-blue-300', '',
                    //Dark Mode
                    'm-0 flex-auto max-w-[3rem]')
            }
        },
        jumptopagedropdown: {
            //@ts-ignore
            root: function root(args) {
                var props = args?.props,
                    state = args?.state;
                return {
                    className: classNames('inline-flex relative cursor-pointer user-none', 'bg-white border rounded-md', 'transition duration-200', 'h-12 mx-2', '',
                        //DarkMode
                        {
                            'outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] border-blue-500': state?.focused && !props?.disabled,
                            //Focus
                            'border-gray-300': !state?.focused,
                            'hover:border-blue-500': !props?.disabled //Hover
                        })
                };
            },

            input: {
                className: classNames('font-sans text-base text-gray-600 py-2 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border-0 pr-0', 'focus:outline-none focus:outline-offset-0', '' //Dark Mode
                )
            },

            trigger: {
                className: classNames('flex items-center justify-center shrink-0', 'text-gray-500 ')
            },
            panel: {
                className: classNames('bg-white text-gray-600 border-0 rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.1)]', '' //Dark Mode
                )
            },

            wrapper: 'overflow-auto',
            list: 'm-0 p-0 py-3 list-none',
            //@ts-ignore
            item: function item(args) {
                var context = args?.context;
                return {
                    className: classNames('relative font-normal cursor-pointer space-nowrap overflow-hidden', 'm-0 py-3 px-5 border-none text-gray-600 rounded-none', 'transition duration-200', '',
                        // Dark Mode
                        {
                            'text-blue-700 bg-blue-50 ': !context?.focused && context?.selected,
                            'bg-blue-300/40': context?.focused && context?.selected,
                            'text-gray-600 bg-gray-300 ': context?.focused && !context?.selected
                        })
                };
            }
        }
    },
}
