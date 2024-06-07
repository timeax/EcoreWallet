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
    'If you want to write it to the DOM, pass a string instead:'
];

const level: keyof typeof console = 'error';

const consoleWarn = console[level];
console[level] = function filterWarnings(msg, ...args) {
    if (SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) return;
    consoleWarn(msg, ...args);
};
