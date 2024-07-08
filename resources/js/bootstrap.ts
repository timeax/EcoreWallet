import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
//@ts-ignore
window.Echo = Echo;

window.Pusher = Pusher;

window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";


const SUPPRESSED_WARNINGS = [
    'If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase',
    'If you want to write it to the DOM, pass a string instead:',
    'remove them from the element, or pass a string or number value to keep them in the DOM'
];

const level: keyof typeof console = 'error';

const consoleWarn = console[level];
console[level] = function filterWarnings(msg, ...args) {
    if (SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) return;
    consoleWarn(msg, ...args);
};

//@ts-ignore
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6683b45a9d7f358570d611bf/1i1p7h1d7';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    //@ts-ignore
    s0.parentNode.insertBefore(s1, s0);
})();
