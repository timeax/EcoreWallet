import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Notifications, User } from '@typings/index';
import { Title } from "@components/Trade";
import { Sidebar } from "primereact/sidebar";
import { useConsole, useWrapper } from "./AuthenticatedContext";
import { getDate, showIf } from "@assets/fn";
import NoData from "@widgets/NoData";
import Select from "@components/Trade/Select";
import Button from "@components/Button";
import { FaTrash } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import { classNames } from "primereact/utils";

//@ts-ignore
const NotificationContext = createContext<{ unread: Notifications[], show(notifications?: Notifications): void }>();

export function useNotifications() {
    return useContext(NotificationContext);
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children, ...props }) => {
    //--- code here ---- //
    const [open, setOpen] = useState(false);
    const { onChange, user } = useWrapper();
    const [notification, setNotification] = useState<Notifications[]>([]);
    const [hard, setHard] = useState<Notifications[]>([]);
    const [folders, setFolders] = useState<{ label: string, value: string }[]>([]);
    const [folder, setFolder] = useState({ label: 'All Category', value: 'all' });
    const [type, setRead] = useState('unread');

    const [more, showMore] = useState(false);

    const logger = useConsole()
    const header = (
        <div>
            <Title noPad xl medium className="items-center">
                Notifications
            </Title>
        </div>
    );

    const asRead = (id: string = '*') => {
        window.axios.post(route('data.mark.as.read'), {
            notify: id,
            user: user.id
        });

        setHard(hard.map(item => {
            if (id == '*') return item;
            if (item.id == id) return {
                ...item,
                read_at: Date.now() + '',
            }

            return item;
        }));
    }

    const del = (id: string) => {
        window.axios.post(route('data.delete'), {
            notify: id,
            user: user.id
        });

        setHard(hard.filter(item => item.id !== id));
    }

    useEffect(() => {
        // if (hard.length == 0) return;
        let data = type == 'all' ? hard : hard.filter(item => type == 'unread' ? !item.read_at : item.read_at)

        if (folder) data = folder.value == 'all' ? data : data.filter(item => item.type == folder.value);

        setNotification(data);
    }, [folder, type, hard])

    useEffect(() => {
        onChange('notifications', e => {
            setHard(e.data);
            const data: any[] = [];

            if (e.event !== 'user.notify') {
                logger.info('New notification')
            }

            e.data.forEach(item => {
                if (data.findIndex(val => val.label == item.type) !== -1) return;
                data.push({ label: item.type, value: item.type })
            })

            setFolders([{ label: 'All Category', value: 'all' }, ...data]);
        }, 'all');
    }, []);

    const readStats = [
        { label: 'read', value: 'read' },
        { label: 'unread', value: 'unread' },
        { label: 'all status', value: 'all' }
    ];

    return (
        <NotificationContext.Provider value={{
            show(notifications) {
                setOpen(true);
            },

            unread: hard.filter(item => !item.read_at)
        }}>
            {children}
            <Sidebar className="!bg-theme-bgColor" position="right" header={header} visible={open} onHide={() => setOpen(false)}>
                {showIf(notification.length > 0, (
                    <>
                        <div className="flex items-center gap-8 mb-5">
                            <Select
                                items={folders}
                                className="grow"
                                quick
                                unique="value"
                                value={folder}
                                onSelect={e => setFolder(e.value)}
                            />

                            <Select
                                items={readStats}
                                className="grow"
                                quick
                                unique="value"
                                value={readStats.find(item => item.value == 'unread')}
                                onSelect={e => setRead(e.value.value)}
                            />
                        </div>
                        <Button className="!p-0 !leading-none hover:!text-theme-emphasis mb-4 text-theme-button-text" shape="pill" size="sm" variant="none" onClick={() => asRead()}>Mark all as read</Button>

                        <div className="flex flex-col gap-4">
                            {notification.map(item => {
                                return (
                                    <div key={item.id} className="border-l-2 pl-3 flex-col flex border-l-emerald-600 gap-2">
                                        <div>
                                            {showIf(folder.value == 'all', <Title xs noPad>{item.type}</Title>)}
                                            <div>
                                                <Title sm noPad>{item.data.props.summary}</Title>
                                                <div>
                                                    <Title bright className="!inline-block" noPad>{item.data.text}.  {showIf<any>(item.data.props.more, () => {
                                                        return <>
                                                            <span className={classNames({
                                                                'hidden': !more
                                                            })}>{item.data.props.more}</span>
                                                            <small onClick={() => showMore(true)} className={classNames('cursor-pointer hover:text-theme-emphasis', {
                                                                'hidden': more
                                                            })}>...show more</small>
                                                        </>
                                                    })}</Title>
                                                    {showIf<any>(item.data.props.link, (() => <Title normal noPad sm>
                                                        <Link href={item.data.props.link?.url || '/'}>{item.data.props.link?.label}</Link>
                                                    </Title>))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <Title noPad brighter xs>{getDate(item.created_at).date}</Title>
                                            <Title noPad className="gap-3" bright xs >{item.read_at ? '' : <>
                                                <Button onClick={() => asRead(item.id)} className="!p-0 !leading-none underline" size="lg" variant="none">
                                                    Mark as read
                                                </Button>
                                            </>} <Button onClick={() => del(item.id)} icon={<FaTrash />} iconLoc="right" spacing="4px" className="!p-0 !leading-none underline hover:!text-danger-300" size="lg" variant="none">
                                                    Delete
                                                </Button>
                                            </Title>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                ), (
                    <NoData>
                        <>No Notifications</>
                        <>You don't have any notifications</>
                    </NoData>
                ))}
            </Sidebar>
        </NotificationContext.Provider >
    );
}


interface NotificationProviderProps extends PropsWithChildren { }
