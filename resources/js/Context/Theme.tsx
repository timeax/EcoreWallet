import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

//@ts-ignore
const ThemeContext = createContext<{ theme: Theme, setTheme: React.Dispatch<Theme> }>();


type Theme = 'light' | 'dark';

export function useTheme() {
    return useContext(ThemeContext);
}

const ThemePropvider: React.FC<ThemePropviderProps> = ({ children }) => {
    //--- code here ---- //
    const [theme, setTheme] = useState<Theme>('dark');

    function addTheme(value: Theme) {
        if (value == 'dark') document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
        //-----
        localStorage.setItem('theme', value);
    }
    //-------
    useEffect(() => {
        const value = localStorage.getItem('theme') || 'dark' as any;
        setTheme(value);
        addTheme(value)
    }, []);



    return (
        <ThemeContext.Provider value={{
            theme, setTheme(value) {
                setTheme(value);
                addTheme(value);
            }
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

interface ThemePropviderProps extends PropsWithChildren {

}

export default ThemePropvider
