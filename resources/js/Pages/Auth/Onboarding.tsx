import Button from '@components/Button';
import { PageProps } from '@typings/index';
import React, { useEffect, useRef, useState } from 'react';
import ss from '@styles/pages/kyc.module.scss';
import "primeicons/primeicons.css";
import { Paper } from '@mui/material';
import { KYCCategory, CatKey, KYCPersonal, KYCAddress, KYCAddresskeys, KYCPersonalkeys, KYCAtom, FormDataType } from '@typings/global';
import Card from '@components/Card';
import { Title } from '@components/Trade';
import Textfield from '@components/Input';
import Note from '@components/Trade/Note';
import { showIf } from '@assets/fn';
import { FaIdCard, FaRegIdCard } from 'react-icons/fa';
import { PiCarDuotone } from 'react-icons/pi';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { routeById } from '@routes/index';
import { RxUpload } from 'react-icons/rx';
import { GrCheckmark } from 'react-icons/gr';
import Tag from '@components/index';
import IconButton from '@components/Button/IconButton';
import { classNames } from 'primereact/utils';
import { useForm } from '@inertiajs/react';
import { OverlayPanel } from 'primereact/overlaypanel';
import AuthenticatedContextProvider, { useNotify } from '@context/AuthenticatedContext';

const inputText =
    "Kindly input your correct details. This information can't be edited after submission";
const uploadText =
    "Kindly select an available ID from options below and upload an eligible copy";


const initPersonal: KYCPersonal = {
    fname: {
        label: "First Name",
        value: undefined
    },
    lname: {
        label: "Last Name",
        value: undefined
    },
    tgram: {
        label: "Middle Name",
        optional: true,
        value: undefined
    },
    email: {
        label: "Email Address",
        optional: undefined,
        value: undefined
    },
    phone: {
        label: "Phone Number",
        value: undefined
    },
    dob: {
        label: "Date of Birth",
        value: undefined
    },

}
const initAddress: KYCAddress = {
    home1: {
        label: "Address Line 1",
        value: undefined
    },
    home2: {
        label: "Address Line 2",
        optional: true,
        value: undefined
    },
    city: {
        label: "City",
        value: undefined
    },
    state: {
        label: "State",
        value: undefined
    },
    country: {
        label: "Country",
        value: undefined
    },
    zip: {
        label: "Zip Code",
        value: undefined
    }
}


const headerinfo = {
    header: "KYC Verification",
    info: "  ",
};

const categories: KYCCategory = {
    personal: {
        title: "Personal Details",
        info: "Please type carefully and fill out the form with your personal details as shown in your ID. ",
        fields: initPersonal
    },

    address: {
        title: "Home Address",
        info: "Your basic address required for identity verification",
        fields: initAddress
    },
    document: {
        title: "Document Upload",
        info: "Unclear images & Expired documents & Images with glare will all be rejected",
        fields: ["Passport", "National ID ", "Driver License"],
    },
};


const Onboarding: React.FC<OnboardingProps> = ({ auth }) => {
    return (
        <AuthenticatedContextProvider user={auth.user}>
            <div className={ss.wrapper}>
                <Page header={headerinfo.header} info={headerinfo.info} fields={categories} />
            </div>
        </AuthenticatedContextProvider>
    )
}

interface OnboardingProps extends PageProps {

}

export default Onboarding



const Page: React.FC<PageProp> = ({ header, fields, info }) => {
    //--- code here ---- //
    //--- code here ---- //
    const [errPermit, setErrPermit] = useState(false)
    const [pgCount, setPgCount] = useState(0);
    const [idType, setIdType] = useState(0);
    const [idTypeName, setIdTypeName] = useState('');
    const [fileFace, setFileFace] = useState<IDFace>("front");
    const idFileRef = useRef({
        front: '',
        back: '',
    });

    const [submit, setSubmit] = useState(false);


    useEffect(() => {
        if (submit) {
            post(route('user.onboarding.post'));
        }
    }, [submit]);

    const ids = ['passport', 'national_id', 'drivers_licence'];

    const icons = [
        <FaIdCard />,
        <PiCarDuotone />,
        <FaRegIdCard />
    ]

    useEffect(() => {
        setIdTypeName(ids[idType])
    }, [idType])

    const { data, errors, post, setData } = useForm<{
        fname: string;
        lname: string;
        mname: string;
        email: string;
        phone: string;
        dob: string;
        home1: string;
        home2: string;
        city: string;
        state: string;
        country: string;
        zip: string;
        idType: string;
        idFront: File
        idBack: File
    }>();

    console.log(errors)

    //MXXX-- for picking key -> value pairs
    const initState = (obj: KYCAddress | KYCPersonal) => {
        let result = {}
        Object.keys(obj).forEach(key => {
            //@ts-ignore
            let ob = obj[key] as KYCAtom
            result = {
                ...result, [key]: ''
            }
        })
        return result
    }


    /**States for Personal Information Inputs */
    const [firstInputs, setFirstInputs] = useState<PersonalState>(initState(initPersonal) as PersonalState)

    /**States for Address Information Inputs */
    const [secondInputs, setSecondInputs] = useState<AddrState>(initState(initAddress) as AddrState)

    const notify = useNotify();
    /**Resetting Error Permit using PageCount Change Monitor */
    useEffect(() => {
        if (firstCall) {
            firstCall = false

        } else {
            setErrPermit(false)

        }
        if (errPermit) {
            notify({ closable: true, severity: 'error', summary: 'Please fill in all required (*) fields ' })
        }
    }, [pgCount, errPermit])

    //FORM FUNCTIONS
    const generateFormData = () => {
        const data = {
            ...idFileRef.current, ...initAddress, ...initPersonal
        } as FormDataType
        Object.keys(initAddress).forEach((k) => {
            let key = k as KYCAddresskeys;
            data[key].value = secondInputs[key]
        })

        Object.keys(initPersonal).forEach((k) => {
            let key = k as KYCPersonalkeys;
            data[key].value = firstInputs[key]
        });

        setPostData(data);

        return data
    }

    function setPostData(data: FormDataType) {
        setData({
            city: data.city.value,
            country: data.country.value,
            dob: data.dob.value,
            email: data.email.value,
            fname: data.fname.value,
            home1: data.home1.value,
            home2: data.home2.value,
            idBack: data.back,
            idFront: data.front,
            idType: idTypeName,
            lname: data.lname.value,
            phone: data.phone.value,
            state: data.state.value,
            mname: data.tgram.value,
            zip: data.zip.value
        })
    }



    /**Whenever NEXT is clicked, this is called to see if all the required fields in current page have been provided
     * if all required fields have been provided, page is moved to the next
     * If not, errors are made visible around required and empty fields
     *
     */
    const checkRequiredFields = () => {
        let isTrue = true;
        main: switch (pgCount) {
            case 0:
                for (const key in firstInputs) {
                    if (Object.prototype.hasOwnProperty.call(firstInputs, key)) {
                        //@ts-ignore
                        const input = categories.personal.fields[key] as KYCAtom;
                        //@ts-ignore
                        const v = firstInputs[key] as KYCAtom;

                        if (input.optional) continue;

                        isTrue = isTrue == Boolean((v + '').replaceAll(' ', ''));
                        if (!isTrue) {
                            break main;
                        }
                    }
                }
                break;
            case 1:
                for (const key in secondInputs) {
                    if (Object.prototype.hasOwnProperty.call(secondInputs, key)) {
                        //@ts-ignore
                        const input = categories.address.fields[key] as KYCAtom;
                        //@ts-ignore
                        const v = secondInputs[key] as KYCAtom;

                        if (input.optional) continue;

                        isTrue = isTrue == Boolean((v + '').replaceAll(' ', ''));
                        if (!isTrue) {
                            break main;
                        }
                    }
                }
                break;
            case 2:
                isTrue = !(!Boolean(idFileRef.current.front) || !Boolean(idFileRef.current.back))
                generateFormData()
                //------------
                break;

        }

        if (isTrue) {
            if (pgCount == 2) setSubmit(true);
            ///---------
            return true
        }
        setErrPermit(true)
    }
    //FORM FUNCTIONS

    const customButton = (label: string, i: number) => {
        let className = idType == i ? ss.select : ss.unselect;
        return (
            <div
                key={i}
                onClick={() => {
                    if (fileFace == "front") setIdType(i);
                }}
                className={ss.btn + " " + className}
            >
                <div className='flex gap-3 items-center'>
                    {icons[i]}
                    <Title noPad sm light>{label}</Title>

                </div> <div className={className}>
                    <i className="pi pi-check"></i>
                </div>
            </div>
        );
    };

    //
    const uploadFace = (direction: IDFace) => {
        return (

            <div className={classNames('flex gap-8 mt-4', ss.uploadContainer)}>
                <Upload label='Front side' onChange={(value) => { idFileRef.current.front = value }} />
                <Upload label='Back side' onChange={(value) => { idFileRef.current.back = value }} />
            </div>
        );
    };
    //

    const generalBodyTemp = (content?: KYCCategory[CatKey], view?: any) => {

        return (

            <div className={ss.page}>
                <Card className={ss.content}>
                    <div className={ss.head}>
                        <div className={ss.counter}>{"0" + (pgCount + 1)}</div>
                        <div className={ss.headerBox}>
                            <Title noPad bold className={ss.title}>{content?.title}</Title>
                            <div className={ss.info}>
                                {inputText}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <Note className='!flex-row !m-0 !pl-0 items-start !gap-1' iconClass='!text-[.95em] pt-1' titleClass='!text-[.85em] normal-case !font-[400] text-theme-text' title={content?.info} />
                        {view}
                    </div>

                </Card>
            </div>
        );
    };


    const uploadTemplate = (content?: KYCCategory["document"]) => {
        return generalBodyTemp(content, <div className={ss.uploadbody}>
            <div className={ss.one}>
                {content?.fields?.map((id, i) => customButton(id, i))}
            </div>

            {uploadFace(fileFace)}
        </div>)
    }

    const normalTemplate = (content?: KYCCategory["personal" | "address"]) => {

        const fields = content?.fields
        if (fields) {
            const keyArr = Object.keys(fields)
            return (
                generalBodyTemp(content,
                    (
                        <div className={ss.body}>
                            {keyArr.map((k, i) => {
                                //@ts-ignore
                                const atom = fields[k] as KYCAtom;
                                let key = k as KYCPersonalkeys | KYCAddresskeys
                                const required = !atom.optional;
                                const label = atom.label
                                const changeHandler = (e: any) => {
                                    if (pgCount) {
                                        setSecondInputs({
                                            ...secondInputs, [key]: e.target.value
                                        })
                                    } else {
                                        setFirstInputs({ ...firstInputs, [key]: e.target.value })
                                    }
                                }
                                if (label.toLowerCase().includes("date")) {
                                    return (
                                        <Textfield
                                            onChange={changeHandler}
                                            key={key}
                                            value={
                                                pgCount
                                                    ? secondInputs[
                                                    key as KYCAddresskeys
                                                    ]
                                                    : firstInputs[
                                                    key as KYCPersonalkeys
                                                    ]
                                            }
                                            required={required}
                                            type="date"
                                            label={label}
                                        />
                                    );
                                } else {
                                    return (
                                        <div key={key} className={ss.textfield}>
                                            <Textfield

                                                value={
                                                    pgCount
                                                        ? secondInputs[
                                                        key as KYCAddresskeys
                                                        ]
                                                        : firstInputs[
                                                        key as KYCPersonalkeys
                                                        ]
                                                }

                                                onChange={changeHandler}
                                                required={required}
                                                label={label} />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    ))
            );

        } return undefined

    };

    const pages = [
        normalTemplate(fields.personal),
        normalTemplate(fields.address),
        uploadTemplate(fields.document),
        finalPage(),
    ];

    return (
        <div className={ss.parent}>
            <div className={ss.headerBox}>
                <div className='flex w-full'>
                    <Button href={route(routeById('dashboard').route)} icon={<FaArrowLeftLong />} variant='none'>Back</Button>
                    <Title noPad className={ss.main_title} xl4 bold>{header}</Title>
                </div>
                <div className={ss.info}>{info}</div>
            </div>
            {pages[pgCount]}
            <div className={ss.btngroup}>
                {pgCount > 0 && pgCount < 3 ? (
                    <Button
                        variant="contained"
                        onClick={() => {
                            setPgCount((p) => p - 1);
                        }}
                        shape='pill'
                    >
                        Previous
                    </Button>
                ) : undefined}
                {pgCount < 3 ? (
                    <Button
                        onClick={() => {
                            if (checkRequiredFields()) setPgCount((p) => p + 1);
                        }}
                        shape='pill'
                        variant="contained"
                    >
                        Next
                    </Button>
                ) : undefined}
            </div>
        </div>
    );
}

interface PageProp {
    header: any,
    info: any;
    fields: KYCCategory
}


const Upload: React.FC<UploadProps> = ({ label, value, onChange }) => {
    //--- code here ---- //
    const [file, setFile] = useState(value);
    const [photoPreview, setPhotoPreview] = useState<any>();

    const ref = useRef<HTMLElement>();
    const op = useRef(null);


    return (
        <Card className={ss.uploads} container={ss.main}>
            <div className="flex items-center flex-col gap-3 justify-center">
                <Title noPad normal lg>{label}</Title>

                {showIf(!file, <IconButton onClick={() => ref.current?.click()} className='!bg-primary-300 !text-white rounded-md !text-[1.5em] !px-4 !py-3' variant='contained'>
                    <RxUpload />
                </IconButton>,
                    //@ts-ignore
                    <IconButton onClick={(e) => op.current.toggle(e)} className='!bg-success-300 !text-white rounded-md !text-[1.5em] !px-4 !py-3' variant='contained'>
                        <GrCheckmark />
                    </IconButton>)}
                <OverlayPanel ref={op}>
                    <img src={photoPreview} alt="Bamboo Watch"></img>
                </OverlayPanel>

                <div onClick={() => ref.current?.click()}>
                    <Title noPad normal md>Click here to upload</Title>
                </div>
                <div onClick={() => ref.current?.click()} className='flex gap-2 items-center justify-center'>
                    {['png', 'jpg', 'pdf'].map(item => {
                        return <Tag key={item} className='border py-1 px-2 rounded-lg' element='div'>
                            <Title upper noPad brighter>
                                {item}
                            </Title>
                        </Tag>
                    })}
                </div>
            </div>
            <input
                //@ts-ignore
                ref={ref}
                onChange={e => {
                    //@ts-ignore
                    setFile(e.target.files);

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setPhotoPreview(e.target?.result)
                    };
                    //@ts-ignore
                    reader.readAsDataURL(ref.current?.files?.[0]);
                    //@ts-ignore
                    onChange?.(e.target.files[0], photoPreview)
                }}
                hidden type='file' />
        </Card>
    );
}

interface UploadProps {
    label: string;
    value?: any;
    onChange?(e: any): void
}


const finalPage = () => {
    return (
        <div className={ss.page}>
            <Paper className={ss.content + " " + ss.lastcontent}>
                Your Information is under review. <br />
                We'll get back to you shortly
            </Paper>
        </div>
    );
};

type IDFace = 'front' | 'back';

type PersonalState = {
    [K in KYCPersonalkeys]: any
}
type AddrState = {
    [K in KYCAddresskeys]: any
}
let firstCall = true;
