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
import { useEffect, useRef, useState } from 'react';
import Textfield from '@components/Input';
import { createContext } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import { Title } from '@components/Trade';
import { useAuth, useConsole } from '@context/AuthenticatedContext';
import { assets, showIf } from '@assets/fn';
import { Copy } from '@context/TransactionDetail';
import QRCode from 'react-qr-code';


const Preference = ({ userEdit, avatarEdit }: any) => {
    const [photoName, setPhotoName] = useState<any>();
    const [photoPreview, setPhotoPreview] = useState<any>();

    const [username, setUsername] = useState<string>('');
    const logger = useConsole();

    const ref = useRef<HTMLInputElement>();
    const user = useAuth();

    useEffect(() => {
        //@ts-ignore
        setPhotoPreview(assets(user.photo))
        //@ts-ignore
        setUsername(user.username);
    }, []);

    //@ts-ignore
    const { data, errors, post, setData, wasSuccessful } = useForm<{ type: string, photo?: any, username?: string }>({
        type: null,
        photo: user.photo,
        username: user.username,
    });

    useEffect(() => {
        if (wasSuccessful) {
            userEdit[1](false);
            avatarEdit[1](false);
            //----------
            logger.success(`Successfully updated ${data.type}`)
        }
    }, [wasSuccessful]);
    //-------
    useEffect(() => {
        if(errors.photo) {
           logger.error(errors.photo)
        }
    }, [errors.photo]);

    return (
        <>
            <Edit title='Edit username' state={userEdit}>
                <Textfield errorText={errors.username} name='username' label='Edit Username' value={username || ''} onChange={(e) => {
                    //@ts-ignore
                    const value = e.target.value;
                    //---
                    setData({
                        'type': 'username',
                        username: value
                    })
                    //@ts-ignore
                    setUsername(e.target.value)
                }} />
                {(props) => {
                    post(route('user.profile.update.general'))
                }}
            </Edit>

            <Edit title='Upload avatar' state={avatarEdit}>
                <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
                    <input type="file" className="hidden"
                        //@ts-ignore
                        ref={ref} onChange={(e) => {
                            setPhotoName(ref.current?.files?.[0].name);
                            //--------
                            setData({
                                photo: e.target.files?.[0],
                                type: 'avatar'
                            });

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

                    <div className="text-center flex flex-col items-center justify-center">
                        <Avatar
                            //@ts-ignore
                            icon={showIf(photoPreview, <img src={photoPreview || assets(user.photo)} />, <FaUser />)}
                            size="large"
                            shape="circle"
                            className="avatar"
                        />
                        <button onClick={() => ref.current?.click()} type="button" className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3">
                            Select New Photo
                        </button>
                    </div>
                </div>
                {(props) => {
                    post(route('user.profile.update.general'))
                }}
            </Edit>
        </>
    )
}

const SettingContext = createContext<any>(null);

export default function Settings({ auth, currencies, languages, settings, gs, ...props }: DashboardProps) {


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
        >
            <SettingContext.Provider value={{ user: auth.user, currencies, languages, settings }}>
                <TabView>
                    <TabPanel header="Preference">
                        <ProfilePage currencies={currencies} languages={languages} />
                    </TabPanel>

                    <TabPanel header="Security">
                        <Security user={auth.user} />
                    </TabPanel>
                </TabView>
            </SettingContext.Provider>
        </AuthenticatedLayout>
    );
}



const ProfilePage: React.FC<ProfilePageProps> = ({ currencies, languages }) => {
    //--- code here ---- //
    const isPhone = useMediaQuery("(max-width: 500px)");

    const userEdit = useState(false);
    const avatarEdit = useState(false);

    const [account, setAccount] = useState();
    const [curr, setCurr] = useState();
    const [theme, setTheme] = useState('light');
    const [lang, setLang] = useState();
    const [image, setImage] = useState<string>()
    const user = useAuth();

    useEffect(() => {
        //@ts-ignore
        setLang(languages.find(item => item.id == user.lang) || languages.find(item => item.is_default == 1))
        setAccount(user.account_no as any)
        //@ts-ignore
        setCurr(currencies.find(item => item.id == user.currency) || currencies.find(item => item.default == 1));

        setTheme(localStorage.getItem('theme') || 'light');

        setImage(assets(user.photo));
    }, []);

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
                            icon={showIf(image, <img src={image} />, <FaUser />)}
                            size="normal"
                            shape="circle"
                            className="avatar"
                        />
                    ),
                },

                { text: "Edit", action: () => avatarEdit[1](true) },
            ],

            [
                {
                    title: "Account Number",
                    info: account ? 'This will be used to recieve crypto from other Ecore users.' : 'Complete your KYC to get an account number'
                },

                {
                    isText: false,
                    data: '',
                },

                { text: <>{account}</>, action: null },
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
                            //@ts-ignore
                            value={lang || languages.find(item => item.is_default == 1) as typeof languages[number]}
                            items={languages}
                            label='code'
                            menu='language'
                            menuGap={8}
                            gap={32}
                            unique='id'
                            onSelect={(e) => {
                                const value = e.value;
                                if (value) router.post(route('user.profile.update.general', { lang: value.id, type: 'lang' }));
                            }}
                            quick
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
                            items={currencies}
                            //@ts-ignore
                            value={curr || currencies.find(item => item.default == 1) as Currencies[number]}
                            label={'code'}
                            menu='code'
                            onSelect={e => {
                                const value = e.value;
                                if (value) router.post(route('user.profile.update.general', { currency: value.id, type: 'currency' }));
                            }}
                            quick
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
                            className="items-center"
                            value={theme}
                            options={themz}
                            onChange={(e) => {
                                setTheme(e.value);
                                localStorage.setItem('theme', e.value)
                            }}
                            optionLabel="icon"
                            optionValue='name'
                        />
                    ),
                    action: null,
                },
            ],
        ],
    };


    return (
        <div className="pg-parent">
            <Preference {...{ userEdit, avatarEdit }} />

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
        </div>
    );
}

interface ProfilePageProps {
    currencies: Currencies;
    languages: DashboardProps['languages']
}


const Edit: React.FC<EditProps> = ({ save = 'Save', children: [content, Footer], title, state: [visible, setVisible] }) => {
    //--- code here ---- //
    return (
        <Dialog
            className="modal"
            footer={(props) => (
                <div className='flex w-full gap-3'>
                    <Button centered className='grow' onClick={() => setVisible(false)} size='normal' bgColor='warning' shape='pill'>
                        Cancel
                    </Button>
                    {showIf(Footer, (
                        <Button centered className='grow' shape='pill' onClick={() => Footer?.(props)} size='normal'>{save}</Button>
                    ))}
                </div>
            )} header={title} visible={visible}
            onHide={() => { if (!visible) return; setVisible(false); }}
        >
            {content}
        </Dialog>
    );
}

interface EditProps {
    children: [content: React.ReactNode, footer?: (props: any) => void];
    title: string;
    state: [boolean, (value: boolean) => void];
    save?: string
}


const Security: React.FC<SecurityProps> = ({ user: userdata }) => {
    //--- code here ---- //
    const email = useState(false);
    const password = useState(false);
    // const phone = useState(false);
    const auth = useState(false);
    // const keys = useState(false);
    // const code = useState(false);
    const activity = useState(false);
    const disable = useState(false);
    const close = useState(false);

    const call = function (state: any) {
        return () => state[1](true);
    }

    const data = {
        twofa: [
            [
                {
                    title: "Email Address ",
                    info: "Changing your email will log you out from all your devices for verification purposes.",
                },

                {
                    isText: false,
                    data: hideText(userdata.email, 0),
                },

                { text: "Edit", action: call(email) },
            ],
            [
                {
                    title: "Login Password",
                    info: "Changing password would require relogging to your account",
                },

                {
                    isText: false,
                    data: "****",
                },

                { text: "Edit", action: call(password) },
            ],

            [
                {
                    title: "Authenticator App (2FA)",
                    info: "Set up and manage 2Factor authentication on your account",
                },

                {
                    isText: false,
                    data: "",
                },

                { text: "Manage", action: call(auth) },
            ],
        ],

        manage: [
            // [
            //     {
            //         title: "Login Activity ",
            //         info: "Review account activity for suspicious activity.. ",
            //     },

            //     {
            //         isText: false,
            //         data: "",
            //     },

            //     {
            //         text: "Manage",
            //         action: call(activity),
            //     },
            // ],
            [
                {
                    title: "Disactivate Account",
                    info: "",
                },

                {
                    isText: false,
                    data: "",
                },

                { text: "Disable", action: call(disable) },
            ]
        ],
    };

    const mainView = (
        <div className="pg-parent">
            <SecurityDialogs {...{ email, password, auth, disable, close, activity }} />
            {/* <Dialog></Dialog> */}
            {mxbox({
                header: "Authentication",
                body: [...data.twofa],
            })}
            {mxbox({
                header: "Account Management",
                body: [...data.manage],
            })}
        </div>
    );
    return mainView
}



const SecurityDialogs: React.FC<SecurityDialogsProps> = ({ email: mailData, password: passcode, auth: authen, disable, activity }) => {
    //--- code here ---- //
    const [email, setEmail] = useState<string>();
    const [password, setOld] = useState<string>();
    const [new_password, setPass] = useState<string>();
    const [password_confirmation, setConfirm] = useState<string>();
    //----
    const { data, setData, put, patch, post, errors, wasSuccessful } = useForm<{
        name?: string;
        email?: string;
        password?: string;
        new_password?: string;
        new_password_confirmation?: string
        code?: string
    }>();
    //---------
    const auth = useAuth();
    useEffect(() => {
        setEmail(auth.email);
        //------

    }, []);

    useEffect(() => {
        if (wasSuccessful) {
            mailData[1](false);
            passcode[1](false);
        }
    }, [wasSuccessful])

    useEffect(() => {
        setData({
            name: auth.name,
            email
        })
    }, [email]);

    useEffect(() => {
        setData({
            email: auth.email,
            password,
            new_password_confirmation: password_confirmation,
            new_password
        })
    }, [password, password_confirmation, new_password]);

    return (
        <>
            <Edit title='Edit Email' state={mailData}>
                {/* @ts-ignore */}
                <Textfield name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='email' label='Edit Email' />
                {(props) => {
                    patch(route('user.profile.update'));
                }}
            </Edit>

            <Edit title='Edit Password' state={passcode}>
                <div className='flex flex-col gap-2'>
                    {/* @ts-ignore */}
                    <Textfield errorText={errors.password} value={password} onChange={e => setOld(e.target.value)} type='password' name='password' label='Old password' />
                    {/* @ts-ignore */}
                    <Textfield errorText={errors.new_password} value={new_password} onChange={e => setPass(e.target.value)} type='password' name='newpassword' label='New password' />
                    {/* @ts-ignore */}
                    <Textfield errorText={errors.new_password_confirmation} value={password_confirmation} onChange={e => setConfirm(e.target.value)} type='password' name='confirmpassword' label='Confirm new password' />

                    <Title noPad sm className='text-primary-700 underline'>
                        <Link href={route('user.forgot-password')}>forgot password?</Link>
                    </Title>
                </div>
                {(props) => {
                    put(route('user.password.update'));
                }}
            </Edit>

            <Edit title='Manage Two-factor authenticator' state={authen}>
                {showIf(auth.two_fa && auth.two_fa_code, (
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <Title noPad sm bright normal className='!block text-center'>Scan the QRcode or copy the code to your authenticator app, preferrably<b> Google authenticator</b></Title>
                        <Title normal className='p-1 !px-3 border rounded-md' lg><Copy value={auth.two_fa} /></Title>

                        <QRCode value={auth.two_fa_code || ''} size={150} />

                        <Textfield name='code' type='text' onChange={(e) => setData({ 'code': e.target.value })} label='Enter code from authenticator' />

                    </div>
                ), <Title lg noPad>Authenticator has been linked</Title>)}
                {auth.two_fa && auth.two_fa_code ? (
                    (props) => {
                        post(route('user.two.step.verify'))
                    }
                ) : undefined}
            </Edit>

            {/* <Edit title='Login Activity' state={activity}>

                {(props) => {
                    return <Button shape='pill' size='normal'>Save</Button>
                }}
            </Edit> */}

            <Edit title='Are you sure?' save='Disable' state={disable}>
                <div className='flex flex-col gap-2'>
                    {/* @ts-ignore */}
                    <Textfield errorText={errors.password} onChange={e => setOld(e.target.value)} name='phone' type='password' label='Enter password' />
                </div>
                {(props) => {
                    post(route('user.profile.destroy'))
                }}
            </Edit>
        </>
    );
}

interface SecurityDialogsProps {
    [x: string]: any
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
