import IconButton from "@components/Button/IconButton";
import CryptoIcon from "@components/CryptoIcon";
import Textfield from "@components/Input";
import { Title } from "@components/Trade";
import { Currencies } from "@typings/index";
import { Dialog } from "primereact/dialog";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from '@styles/components/trade-input.module.scss';

//@ts-ignore
const Context = createContext<Data>();

interface Data {
    selected?: Currencies[number];
    show(currencies: Currencies, title: string): void
}

export function useWallets() {
    return useContext(Context);
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
    //--- code here ---- //
    const [currencies, setCurrs] = useState<Currencies>([]);
    const [fixed, setStatic] = useState<Currencies>([]);
    const [view, setShow] = useState(false);
    const [title, setTitle] = useState('Select Currency');
    const [selected, setSelected] = useState<Currencies[number]>();
    function show(currs: Currencies, title: string) {
        setTitle(title);
        setStatic(currs);
        setCurrs(currs);
        setShow(true);
    }

    useEffect(() => {
        if (selected) setShow(false);
    }, [selected]);

    return (
        <Context.Provider value={{ selected, show, }}>
            {children}

            <Dialog header={title} visible={view} className={styles.currencyList} onHide={() => { setShow(false); }}>
                <div className="m-0">
                    <Textfield placeholder='Search' onChange={(e) => {
                        //@ts-ignore
                        const value: string = (e.target.value || '').toLowerCase();
                        if (value.trim() == '') return setCurrs(fixed);
                        setCurrs(fixed.filter(item => item.code.toLowerCase().includes(value) || item.curr_name.toLowerCase().includes(value)));
                    }} />
                    <div className="mt-4 flex flex-col">
                        {currencies?.map(item => {
                            return (
                                <div key={item.id} className='flex px-3 py-2 rounded-md hover:bg-theme-button cursor-pointer items-center' onClick={() => {
                                    setShow(false);
                                    setSelected(item);
                                }}>
                                    <div className="flex gap-2 items-center mr-auto">
                                        <CryptoIcon curr={item} height='30px' width='30px' size='11px' name={item.curr_name} label={item.symbol} />
                                        <div className='flex flex-col'>
                                            <Title bold noPad>{item.code}</Title>
                                            <Title noPad>{item.curr_name}</Title>
                                        </div>
                                    </div>

                                    <IconButton variant='none'><FaStar /></IconButton>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Dialog>
        </Context.Provider>
    );
}

interface CurrencyProviderProps extends PropsWithChildren {

}
