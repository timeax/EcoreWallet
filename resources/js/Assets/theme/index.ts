import { PrimeReactPTOptions } from "primereact/api";
import Tailwind from 'primereact/passthrough/tailwind';
import carousel from "./carousel";
import button from "./button";

const AppTheme: PrimeReactPTOptions = {
    carousel,
    button,
    datatable: Tailwind.datatable
}

export default AppTheme;
