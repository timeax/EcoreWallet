import Button from '@components/Button';
import { UICard, UICHeader } from '@components/Card';
import Textfield from '@components/Input';
import { Title } from '@components/Trade';
import Select from '@components/Trade/Select';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@typings/index';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';

export default function Welcome({ auth, error, errors, flash, templates, ...props }: PageProps<{ templates: Templates[] } & Props>) {
    const [newTemps, setNew] = useState<Templates[]>([]);

    // if (flash.message) {
    //     window.location.reload();
    // }

    return (
        <>
            <Head title="Edit Email templates">
                <style>
                    {`
                        body {
                            height: 100vh;
                            overflow: auto
                        }
                    `}
                </style>
            </Head>
            <Button onClick={() => setNew([...newTemps, { codes: {}, email_body: '<span>Hello {name}</span>', email_subject: 'new_template', email_type: 'Unset', status: 1 }])}>New Template</Button>

            <Button onClick={async (e) => {
                const stats = await window.axios.post(route('resend.hook'))
                console.log(stats);
            }}>Resend hook</Button>

            <div className='flex flex-wrap gap-x-10 justify-center'>
                {newTemps.map((item, index) => <Template key={index} {...item} databases={Object.keys(props).map(item => ({
                    label: item,
                    value: props[item] as string[]
                }))} />)}
                {templates.map(item => <Template key={item.id} {...item} databases={Object.keys(props).map(item => ({
                    label: item,
                    value: props[item] as string[]
                }))} />)}
            </div>
        </>
    );
}


const Template: React.FC<TemplateProps> = ({ email_body, id, codes, email_subject, email_type, databases }) => {
    //--- code here ---- //
    const [show, setShow] = useState(false);
    const [list, setList] = useState(Object.keys(codes).map(item => ({ name: item, meaning: codes[item] })));

    const reset = () => {
        setList(Object.keys(codes).map(item => ({ name: item, meaning: codes[item] })));
    }

    const [edit, setEdit] = useState('');

    const [selected, setSelected] = useState<any>(undefined);

    const [name, setName] = useState('');
    const [submit, setSubmit] = useState(false);
    const [meaning, setMeaning] = useState('');

    const { data, setData, post, errors } = useForm({
        id,
        codes: {},
        email_body,
        email_subject,
        email_type,
        status: 1
    });

    useEffect(() => {
        if (edit) {
            let item = list.find(item => item.name == edit);
            //---
            if (item) {
                setName(item.name);
                setMeaning(item.meaning);
            }
            setShow(true);
        }
    }, [edit]);

    useEffect(() => {
        if (Object.keys(errors).length > 0)
            console.log(errors)
    }, [])


    useEffect(() => {
        if (submit) {
            console.log(data)
            post(route('template'));
        }
    }, [submit]);

    return (
        <UICard body='!overflow-visible' container='!overflow-visible' className='w-[31%] !overflow-visible my-6' header={<UICHeader title={email_type} />}>
            <Dialog visible={show} onHide={() => setShow(false)} header='Add Code'>
                <Textfield onChange={(e) => setName(e.target.value)} value={name} label={'Name'} />
                <Textfield onChange={(e) => setMeaning(e.target.value)} value={meaning} label={'Meaning'} />
                <Button onClick={() => {
                    let newList = list;
                    if (edit) {
                        let item = list.find(item => item.name == edit);
                        //---
                        if (item) newList = list.filter(l => l.name !== item.name);
                    }

                    if (name && meaning) {
                        setList([...newList.filter(item => item.name !== name), { name, meaning }])
                    }

                    setShow(false);
                    setEdit('');
                }} className='mt-4'>Add</Button>
            </Dialog>
            <div className="flex gap-3 flex-col">
                <Textfield onChange={(e) => setData('email_type', e.target.value)} value={data.email_type} label={'Type'} />
                <Textfield onChange={(e) => setData('email_subject', e.target.value)} value={data.email_subject} label={'Subject'} />
                <div className='flex grow flex-col gap-3'>
                    <div className="flex grow flex-wrap gap-2">
                        {list.map((item, index) => {
                            return <div className='flex p-1 gap-2 border' key={index} >
                                <Title noPad className='my-1' normal>{item.name}</Title>
                                <button onClick={() => setList(list.filter(f => item.name !== f.name))}><FaDeleteLeft /></button>
                                <button onClick={() => setEdit(item.name)}><FaPen /></button>
                            </div>
                        })}
                    </div>
                    <div className='flex gap-2 items-center'>

                        <Button onClick={() => {
                            setName('');
                            setEdit('');
                            setMeaning('');
                            setShow(true)
                        }} size='normal' shape='pill'>add key</Button>

                        <Select
                            value={selected}
                            items={databases}
                            placeholder='Map to Table'
                            quick
                            unique='label'
                            contained
                            className='bg-theme-button rounded-lg'
                            gap={9}
                            onSelect={async (e) => {
                                const isSure = await window.confirm('Are you sure');
                                if (isSure) {
                                    //@ts-ignore
                                    setList(e.value.value.map(item => {
                                        return { name: item, meaning: item }
                                    }));

                                    setSelected(e.value);
                                }
                                //----
                            }}
                        />

                        <Button onClick={() => {
                            setName('');
                            setEdit('');
                            setMeaning('');
                            reset()
                        }} size='normal' shape='pill'>reset</Button>


                    </div>
                </div>
                <Button centered onClick={async () => {
                    let code = {} as any;
                    list.forEach(item => code[item.name] = item.meaning);
                    //--------
                    setData('codes', code);

                    const run = await window.confirm('You want to submit?');
                    if (run) setSubmit(run)
                }}>Submit</Button>
            </div>
        </UICard>
    );
}

interface TemplateProps extends Templates {
    databases: Array<{ label: string, value: string[] }>
}


interface Props extends PageProps {
    error?: string
}


interface Templates {
    "email_type": string,
    "email_subject": string,
    "email_body": string,
    id?: number;
    status: any;
    "codes": Record<string, string>
}
