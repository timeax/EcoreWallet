import { SidebarPassThroughOptions } from "primereact/sidebar";
import { classNames } from "primereact/utils";

const sidebar: SidebarPassThroughOptions = {
    root: function root(_ref17) {
        var props = _ref17?.props;
        return {
            className: classNames('flex flex-col pointer-events-auto relative transform relative', 'bg-white text-gray-700 border-0 shadow-lg', {
                '!transition-none !transform-none !w-screen !h-screen !max-h-full !top-0 !left-0': props?.fullScreen,
                'h-full w-96 max-sm:w-[99%]': props?.position == 'left' || props?.position == 'right',
                'h-40 w-full': props?.position == 'top' || props?.position == 'bottom'
            }, 'dark:border dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80')
        };
    },
    header: {
        className: classNames('flex items-center justify-between', 'p-5')
    },
    closeButton: {
        className: classNames('flex items-center justify-center overflow-hidden relative', 'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0', 'hover:text-gray-700 hover:border-transparent hover:bg-gray-200', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
            // focus
            'dark:hover:text-white/80 dark:hover:text-white/80 dark:hover:border-transparent dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]')
    },
    //@ts-ignore
    closeButtonIcon: 'w-4 h-4 inline-block',
    content: {
        className: classNames('p-5 pt-0 h-full w-full', 'grow overflow-y-auto')
    },
    mask: {
        className: classNames('flex pointer-events-auto', 'bg-black bg-opacity-40 transition duration-200 z-20 transition-colors')
    },
    transition: function transition(_ref18) {
        var props = _ref18.props;
        return {
            timeout: 300,
            classNames: props.fullScreen ? {
                enter: 'opacity-0',
                enterActive: '!opacity-100 transition-opacity duration-300 ease-in',
                exit: 'opacity-100 transition-opacity duration-300 ease-in',
                exitActive: '!opacity-0'
            } : props.position === 'top' ? {
                enter: 'translate-x-0 -translate-y-full translate-z-0',
                enterActive: '!translate-y-0 transition-transform duration-300',
                exit: 'translate-y-0 transition-transform duration-300',
                exitActive: 'translate-x-0 !-translate-y-full translate-z-0'
            } : props.position === 'bottom' ? {
                enter: 'translate-x-0 translate-y-full translate-z-0',
                enterActive: '!translate-y-0 transition-transform duration-300',
                exit: 'translate-y-0 transition-transform duration-300',
                exitActive: 'translate-x-0 !translate-y-full translate-z-0'
            } : props.position === 'left' ? {
                enter: '-translate-x-full translate-y-0 translate-z-0',
                enterActive: '!translate-x-0 transition-transform duration-300',
                exit: 'translate-x-0 transition-transform duration-300',
                exitActive: '!-translate-x-full translate-y-0 translate-z-0'
            } : props.position === 'right' ? {
                enter: 'translate-x-full translate-y-0 translate-z-0',
                enterActive: '!translate-x-0 transition-transform duration-300',
                exit: 'translate-x-0 transition-transform duration-300',
                exitActive: '!translate-x-full translate-y-0 translate-z-0'
            } : undefined
        };
    }
}


export default sidebar;
