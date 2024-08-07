import '../css/app.css';
import './bootstrap';

import { PrimeReactProvider } from 'primereact/api';
import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import '@styles/index.scss';
import { twMerge } from 'tailwind-merge';
import AppTheme from '@assets/theme/index';
import ThemePropvider from '@context/Theme';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';



createInertiaApp({
    title: (title) => {
        return `${title} - ${appName}`
    },
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemePropvider>
                <PrimeReactProvider value={{ unstyled: true, pt: AppTheme, ptOptions: { mergeSections: true, mergeProps: true, classNameMergeFunction: twMerge } }}><App {...props} /></PrimeReactProvider>
            </ThemePropvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
}).then(() => {
    document.querySelector('#app')?.removeAttribute('data-page');
});
