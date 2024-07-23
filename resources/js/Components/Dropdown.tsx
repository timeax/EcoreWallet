import { useState, createContext, useContext, Fragment, PropsWithChildren, Dispatch, SetStateAction, useEffect, useRef, Ref } from 'react';
import { Link, InertiaLinkProps } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Tag from '.';

const DropDownContext = createContext<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    ref?: React.MutableRefObject<HTMLDivElement | undefined>
    toggleOpen: () => void;
    onSelect(value?: string): void
    event?(callback: Function): void
}>({
    open: false,
    setOpen: () => { },
    toggleOpen: () => { },
    onSelect(value) { },
});

const Dropdown = ({ children, className = '', onSelect }: PropsWithChildren<{ className?: string, onSelect?: (value?: any) => void }>) => {
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>();

    const toggleOpen = () => {
        setOpen((previousState) => {
            let newState = !previousState;

            return newState;
        });
    };

    useEffect(() => {

    }, [])

    const select = (value: string) => {
        onSelect?.(value)
    }

    return (
        //@ts-ignore
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen, onSelect: select, ref }}>
            <div
                //@ts-ignore
                ref={ref} className={`relative ${className}`}>{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }: PropsWithChildren) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div data-section='trigger' className={open ? 'open' : ''} onClick={toggleOpen}>{children}</div>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({ align = 'right', width = '48', contentClasses = 'py-1 bg-white', children }: PropsWithChildren<{ align?: 'left' | 'right', width?: string, contentClasses?: string }>) => {
    const { open, setOpen, ref } = useContext(DropDownContext);
    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }


    const [auto, setAuto] = useState('');

    let widthClasses = '';

    if (width === '48') {
        widthClasses = 'w-48';
    } else widthClasses = width;

    function adjust(menu: HTMLDivElement) {
        const rect = menu.getBoundingClientRect();
        const wH = window.innerHeight, wW = window.innerWidth;

        const diffH = wH - rect.y;

        let classes: string[] = [];

        if (diffH < rect.height) {
            classes.push('bottom-[100%]')
        }

        if (classes.length > 0) setAuto(classes.join(' '))
    }

    if (ref) {
        setTimeout(() => {
            const menu = ref.current?.querySelector('.drop-menu') as HTMLDivElement;
            if (menu && open) adjust(menu);
        }, 50);
    }

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            //@ts-ignore
            >
                <div
                    data-section='menu'
                    className={`absolute drop-menu z-50  mt-2 rounded-md shadow-lg ${alignmentClasses} ${auto} ${widthClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>{children}</div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = '', children, value, ...props }: LinkProps) => {
    const { onSelect } = useContext(DropDownContext);

    return (
        //@ts-ignore
        <Tag
            //@ts-ignore
            element={props.href ? Link : 'span'}
            onClick={() => onSelect(value)}
            {...props}
            className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ' +
                className
            }
        >
            {children}
        </Tag>
    );
};
//@ts-ignore
interface LinkProps extends InertiaLinkProps {
    href?: string;
    value?: string
}

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
