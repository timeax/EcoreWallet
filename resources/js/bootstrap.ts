import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
//@ts-ignore
window.Echo = Echo;

window.Pusher = Pusher;

window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const SUPPRESSED_WARNINGS = [
    'ForwardRef(SparkLineChart2)',
    'Warning: Failed %s type: %s%s',
    'If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase',
    'If you want to write it to the DOM, pass a string instead:',
    'remove them from the element, or pass a string or number value to keep them in the DOM',
    'Support for defaultProps will be removed from function components in'
];

let level: keyof typeof console = 'error';

let consoleWarn = console[level];
console[level] = function filterWarnings(msg, ...args) {
    if (SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) return;
    consoleWarn(msg, ...args);
};

level = 'warn';

const consoleWarn2 = console[level];
console[level] = function filterWarnings(msg, ...args) {
    if (SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) return;
    consoleWarn2(msg, ...args);
};
