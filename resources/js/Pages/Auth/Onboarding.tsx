import Button from '@components/Button';
import { PageProps } from '@typings/index';
import React, { useEffect, useRef, useState } from 'react';
import ss from '@styles/pages/kyc.module.scss';
import front from "@assets/images/id-front.svg";
import back from "@assets/images/id-back.svg";
import none from "@assets/images/noimage.jpg";
import "primeicons/primeicons.css";
import { Paper } from '@mui/material';
import { KYCCategory, CatKey, KYCPersonal, KYCAddress, KYCAddresskeys, KYCPersonalkeys, KYCAtom, FormDataType } from '@typings/global';
import Card from '@components/Card';
import { Title } from '@components/Trade';
import Textfield from '@components/Input';
import Note from '@components/Trade/Note';
import { showIf } from '@assets/fn';
import { FaIdCard, FaRegIdCard, FaUpload } from 'react-icons/fa';
import { PiCarDuotone } from 'react-icons/pi';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { routeById } from '@routes/index';
import { RxUpload } from 'react-icons/rx';
import { GrCheckmark } from 'react-icons/gr';
import Tag from '@components/index';
import IconButton from '@components/Button/IconButton';
import { classNames } from 'primereact/utils';
import { useForm } from '@inertiajs/react';
import { beforeEach } from 'node:test';


const idfaces = { front, back };
const arrows = {
    front: "pi pi-arrow-right",
    back: "pi pi-arrow-left",
};
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
    tgram: {
        label: "Telegram Username",
        optional: true,
        value: undefined
    }
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
        info: "Please type carefully and fill out the form with your personal details. ",
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


const Onboarding: React.FC<OnboardingProps> = () => {
    return <Page header={headerinfo.header} info={headerinfo.info} fields={categories} />
}

interface OnboardingProps extends PageProps {

}

export default Onboarding



const Page: React.FC<PageProp> = ({ header, fields, info }) => {
    //--- code here ---- //
    //--- code here ---- //
    const formData = useRef({});
    const [errPermit, setErrPermit] = useState(false)
    const [pgCount, setPgCount] = useState(0);
    const [idType, setIdType] = useState(0);
    const [fileFace, setFileFace] = useState<IDFace>("front");
    const idFileRef = useRef({
        front: '',
        back: '',
    });
    const [idView, setidView] = useState<{ front: any, back: any }>({ front: undefined, back: undefined });
    const icons = [
        <FaIdCard />,
        <PiCarDuotone />,
        <FaRegIdCard />
    ]

    let optional = []

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

    /**Resetting Error Permit using PageCount Change Monitor */
    useEffect(() => {
        if (firstCall) {
            firstCall = false

        } else {
            setErrPermit(false)

        }
        if (errPermit) {
            console.log("error dey")
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
        })

        return data
    }

    /**Whenever NEXT is clicked, this is called to see if all the required fields in current page have been provided
     * if all required fields have been provided, page is moved to the next
     * If not, errors are made visible around required and empty fields
     *
     */
    const checkRequiredFields = () => {
        let isTrue = true;
        switch (pgCount) {
            case 0:
                Object.values(firstInputs).forEach(v => {
                    isTrue = isTrue == Boolean((v + '').replaceAll(' ', ''))
                })
                break;
            case 1:
                Object.values(secondInputs).forEach((v) => {
                    isTrue = isTrue == Boolean((v + '').replaceAll(' ', ''))
                })
                break;
            case 2:
                isTrue = isTrue == Boolean(idFileRef.current.front) == Boolean(idFileRef.current.back)
                console.log("Form Data")
                console.log(generateFormData())
                break;

        }

        if (isTrue) {
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

    const arrowBtn = (direction: IDFace | string) => {
        switch (direction) {
            case "front":
                return (
                    <Button
                        onClick={() => {
                            setFileFace("back");
                        }}
                        className={ss.arrowbx}
                        icon={<FaArrowRightLong />}
                    >
                        Backside
                    </Button>
                );

            case "back":
                return (
                    <Button
                        onClick={() => {
                            setFileFace("front");
                        }}
                        className={ss.arrowbx}

                    >
                        Frontside
                    </Button>
                );
        }
    };

    //
    const uploadFace = (direction: IDFace) => {
        return (

            <div className={classNames('flex gap-8 mt-4', ss.uploadContainer)}>
                <Upload label='Front side' />
                <Upload label='Back side' />
            </div>
            // <div className={ss.two}>
            //     <div className={ss.uploadbox}>
            //         <input
            //             onChange={(e) => {
            //                 if (e.target.files?.length) {
            //                     //@ts-ignore
            //                     idRef.current[direction] = e.target.files[0];
            //                     setidView({
            //                         ...idView,
            //                         [direction]: URL.createObjectURL(e.target.files[0]),
            //                     });
            //                 }
            //             }}
            //             accept="image/*"
            //             type="file"
            //             id="mx-kyc-fileup"
            //             style={{ display: "none" }}
            //         />
            //         <span>
            //             <Button
            //                 shape='square'
            //                 size='normal'
            //                 onClick={() => {
            //                     document.getElementById("mx-kyc-fileup")?.click();
            //                 }}
            //                 variant="contained"
            //             >
            //                 Upload
            //             </Button>
            //         </span>
            //         <img src={idView[direction] || idfaces[direction]} alt="" />
            //     </div>
            //     {/* <div className={ss.describe}>
            //         <img src={idfaces[direction]}></img>
            //         {idView[direction] || fileFace == "back"
            //             ? arrowBtn(direction)
            //             : undefined}
            //     </div> */}
            // </div>
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
    const [file, setFile] = useState();
    const ref = useRef<HTMLElement>();
    return (
        <Card className={ss.uploads} container={ss.main}>
            <div className="flex items-center flex-col gap-3 justify-center">
                <Title noPad normal lg>{label}</Title>

                {showIf(!file, <IconButton className='!bg-primary-300 !text-white rounded-md !text-[1.5em] !px-4 !py-3' variant='contained'>
                    <RxUpload />
                </IconButton>, <IconButton className='!bg-success-300 !text-white rounded-md !text-[1.5em] !px-4 !py-3' variant='contained'>
                    <GrCheckmark />
                </IconButton>)}

                <div onClick={() => ref.current?.click()}>
                    <Title noPad normal md>Click here to upload</Title>
                </div>
                <div className='flex gap-2 items-center justify-center'>
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
                    setFile(e.target.files[0]);
                    //@ts-ignore
                    onChange?.(e)
                }}
                hidden type='file' />
        </Card>
    );
}

interface UploadProps {
    label: string;
    value?: any;
    onChange?(e: React.ChangeEventHandler<HTMLInputElement>): void
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
