import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { Currencies, PageProps, User } from '@typings/index';
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import { hideText, mxbox } from '@assets/fn/settings';
import { useMediaQuery } from '@mui/material';
import '@styles/pages/settings.scss';
import { themz } from '@assets/fn/data';
import { Avatar } from 'primereact/avatar';
import { SelectButton } from "primereact/selectbutton";
import Select from '@components/Trade/Select';
import { FaUser } from 'react-icons/fa';
import "primeicons/primeicons.css";
import { TabView, TabPanel } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog';
import { FC, useRef, useState } from 'react';
import Textfield from '@components/Input';
import { classNames } from 'primereact/utils';


const Preference = ({ userEdit, avatarEdit }: any) => {
    const [photoName, setPhotoName] = useState<any>();
    const [photoPreview, setPhotoPreview] = useState<any>();

    const ref = useRef<HTMLInputElement>();

    return (
        <>
            <Edit title='Edit Username' state={userEdit}>
                <Textfield name='username' label='Edit Username' />
                {(props) => {
                    return <Button shape='pill' size='normal'>Save</Button>
                }}
            </Edit>

            <Edit title='Upload avatar' state={avatarEdit}>
                <div  className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
                    <input type="file" className="hidden"
                        //@ts-ignore
                        ref={ref} onChange={() => {
                            setPhotoName(ref.current?.files?.[0].name);

                            const reader = new FileReader();
                            reader.onload = (e) => {
                                setPhotoPreview(e.target?.result)
                            };
                            //@ts-ignore
                            reader.readAsDataURL(ref.current?.files?.[0]);
                        }} />

                    <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="photo">
                        Profile Photo <span className="text-red-600"> </span>
                    </label>

                    <div className="text-center">
                        {/* <!-- Current Profile Photo --> */}
                        <div className={classNames("mt-2", { 'hidden': !photoPreview })}>
                            <img src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" className="w-40 h-40 m-auto rounded-full shadow" />
                        </div>
                        {/* <!-- New Profile Photo Preview --> */}
                        <div className={classNames("mt-2", { 'hidden': !photoPreview })}>
                            <span className="block w-40 h-40 rounded-full m-auto shadow" style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundImage: `url('${photoPreview}')`, }}>
                            </span>
                        </div>
                        <button type="button" className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3">
                            Select New Photo
                        </button>
                    </div>
                </div>
                {(props) => {
                    return <Button shape='pill' size='normal'>Save</Button>
                }}
            </Edit>
        </>
    )
}

export default function Settings({ auth, currencies, languages, settings, gs, ...props }: DashboardProps) {
    const isPhone = useMediaQuery("(max-width: 500px)");

    const userEdit = useState(false);
    const avatarEdit = useState(false);

    const data = {
        profile: [
            [
                {
                    title: "Username ",
                    info: "Set up your username or preferred nickname. It is advisable to avoid using your real name ",
                },

                {
                    isText: false,
                    data: "",
                },

                {
                    text: "Edit", action() {
                        userEdit[1](true);
                    }
                },
            ],
            [
                {
                    title: "Avatar",
                    info: "Set up a preferred Avatar for your account",
                },

                {
                    isText: false,
                    data: (
                        <Avatar
                            icon={<FaUser />}
                            size="large"
                            shape="circle"
                            className="avatar"
                        />
                    ),
                },

                { text: "Edit", action: () => avatarEdit[1](true) },
            ],
        ],

        general: [
            [
                {
                    title: "Language ",
                    info: "",
                },

                {
                    isText: false,
                    data: "",
                },
                {
                    text: (
                        <Select
                            value={languages.find(item => item.code == 'en') as any}
                            items={languages}
                            label='code'
                            menu='language'
                            menuGap={8}
                            gap={32}
                            unique='id'
                            marker='dot'
                            content='!w-fit'
                        />
                    ),
                    action: null,
                },
            ],

            [
                {
                    title: "Currency",
                    info: "",
                },

                {
                    isText: false,
                    data: "",
                },

                {
                    text: (
                        <Select
                            value={currencies.find(item => item.code == 'USD') as any}
                            items={currencies}
                            label={'code'}
                            menu='code'
                            marker='dot'
                            content='!w-fit'
                            gap={20}
                            menuGap={10}
                            unique='id'
                        />
                    ),
                    action: null,
                },
            ],
            [
                {
                    title: "Theme ",
                    info: "",
                },

                {
                    isText: false,
                    data: "",
                },

                {
                    text: (
                        <SelectButton
                            disabled
                            className="slct-btn"
                            value={themz[0].icon}
                            options={themz}
                            optionLabel="icon"
                        />
                    ),
                    action: null,
                },
            ],
        ],

        notify: [
            [
                {
                    title: "Email",
                    info: "",
                },

                {
                    isText: false,
                    data: "",
                },

                { text: "Edit", action: null },
            ],
            [
                {
                    title: "Telegram ",
                    info: "",
                },

                {
                    isText: false,
                    data: "",
                },
                { text: "Edit", action: null },
            ],

            [
                {
                    title: "SMS ",
                    info: <i>... charges may apply</i>,
                },

                {
                    isText: false,
                    data: "",
                },

                { text: "Edit", action: null },
            ],
        ],
    };


    const mainView = (
        <div className="pg-parent">
            {/* <Dialog></Dialog> */}
            {mxbox({
                header: "Profile",
                body: [...data.profile],
                isPhone,
            })}
            {mxbox({
                header: "General",
                body: [...data.general],
                isPhone: false,
            })}
            {mxbox({
                header: "Notification",
                body: [...data.notify],
                isPhone,
            })}
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            title='Settings'
            {...props}
            header={<Dropdown className='hidden' onSelect={(value) => {
                window.axios.post(route('api.webhook'))
            }}>
                <Dropdown.Trigger>
                    <Button size='sm' variant='outlined' bgColor='success'>{auth.user.email}</Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Link value='paid'>Paid</Dropdown.Link>
                    <Dropdown.Link value='process'>Process</Dropdown.Link>
                    <Dropdown.Link value='failed'>Failed</Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>}
            pusher={true}
            desc={`Welcome back! ${auth.user.name.split(' ')[0]}`}
        >

            <TabView >
                <TabPanel header="Preference">
                    {mainView}
                    <Preference {...{ userEdit, avatarEdit }} />
                </TabPanel>

                <TabPanel header="Security">
                    <Security user={auth.user} />
                </TabPanel>
            </TabView>
        </AuthenticatedLayout>
    );
}


const Edit: React.FC<EditProps> = ({ children: [content, Footer], title, state: [visible, setVisible] }) => {
    //--- code here ---- //
    return (
        <Dialog
            className="max-w-[350px]"
            footer={(props) => <Footer props={props} />} header={title} visible={visible}
            style={{ width: '50vw' }}
            onHide={() => { if (!visible) return; setVisible(false); }}
        >
            {content}
        </Dialog>
    );
}

interface EditProps {
    children: [content: React.ReactNode, footer: FC<{ props: any }>];
    title: string;
    state: [boolean, (value: boolean) => void]
}


const Security: React.FC<SecurityProps> = ({ user: userdata }) => {
    //--- code here ---- //

    const data = {
        twofa: [
            [
                {
                    title: "Email Address ",
                    info: "",
                },

                {
                    isText: false,
                    data: hideText(userdata.email, 0),
                },

                { text: "Edit", action: null },
            ],
            [
                {
                    title: "Login Password",
                    info: "",
                },

                {
                    isText: false,
                    data: "****",
                },

                { text: "Edit", action: null },
            ],

            [
                {
                    title: "Phone Number",
                    info: "",
                },

                {
                    isText: false,
                    data: hideText(userdata.phone),
                },

                { text: "Edit", action: null },
            ],
            [
                {
                    title: "Authenticator App",
                    info: "",
                },

                {
                    isText: false,
                    data: "",
                },

                { text: "Manage", action: null, disabled: true },
            ],
            [
                {
                    title: "PassKeys",
                    info: "",
                },

                {
                    isText: false,
                    data: "",
                },

                { text: "Manage", action: null, disabled: true },
            ],
        ],

        advanced: [
            [
                {
                    title: "Anti-Phising Code ",
                    info: "",
                },

                {
                    isText: false,
                    data: "",
                },

                {
                    text: "Edit",
                    action: null,
                },
            ],

            //3RD PARTY
            [
                {
                    title: "Third Party Accounts",
                    info: "Enable sign-in with Google, Apple, Microsoft, etc. ",
                },

                {
                    isText: false,
                    data: "",
                },

                {
                    text: "Manage",
                    action: null,
                },
            ],
            [
                {
                    title: "Manage Devices",
                    info: "",
                },

                {
                    isText: false,
                    data: "",
                },

                {
                    text: "Manage",
                    action: null,
                },
            ],
            [
                {
                    title: "Account Activity ",
                    info: "Review account activity for suspicious activity.. ",
                },

                {
                    isText: false,
                    data: "",
                },

                {
                    text: "Manage",
                    action: null,
                },
            ],
        ],

        manage: [
            [
                {
                    title: "Disable Account",
                    info: "",
                },

                {
                    isText: false,
                    data: "",
                },

                { text: "Disable", action: null },
            ],
            [
                {
                    title: "Close Account ",
                    info: (
                        <b>
                            Beware!! This will permanently erase your account and all related
                            information from the platform..
                        </b>
                    ),
                },

                {
                    isText: false,
                    data: "",
                },
                { text: "Close", action: null },
            ],
        ],
    };

    const mainView = (
        <div className="pg-parent">
            {/* <Dialog></Dialog> */}
            {mxbox({
                header: "Two Factor Authentication (2FA)",
                body: [...data.twofa],
            })}
            {mxbox({
                header: "Advanced",
                body: [...data.advanced],
            })}
            {mxbox({
                header: "Account Management",
                body: [...data.manage],
            })}
        </div>
    );
    return mainView
}

interface SecurityProps {
    user: User
}


interface DashboardProps extends PageProps {
    languages: Array<{ id: number, is_default: boolean, code: string, file: string }>
    currencies: Currencies;
    settings: {
        id: number;
        user_id: number;
        data: any
    }
}
