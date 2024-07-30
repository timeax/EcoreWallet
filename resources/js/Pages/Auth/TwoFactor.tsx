import GuestLayout from '@layouts/GuestLayout';
import { Head, router, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { FaMinus } from 'react-icons/fa';
import Button from '@components/Button';
import { Messgae } from '@typings/index';

export default function VerifyCode({ error, flash, status }: { flash?: { message: Messgae }; status?: string, code: any, error?: string }) {
    const { post, processing, setData, data, errors, wasSuccessful } = useForm<{ code: string | number | null | undefined, to: string }>({ code: null, to: 'login' });

    const customInput = ({ events, props: { key, unstyled, invalid, ...props } }: any) => {
        return <React.Fragment key={key}><input
            {...events}
            {...props}
            type="text"
            className="custom-otp-input-sample"
            invalid={invalid + ''}
        />
            {props.id === 2 && <div className="flex items-center px-3">
                <FaMinus />
            </div>}
        </React.Fragment>
    };
    if (wasSuccessful) {
        setTimeout(() => {
            router.visit(route('user.dashboard'));
        }, 1000);
    }


    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('user.two.step.verify'));
    };


    return (
        <GuestLayout title='Two factor authentication' desc='Please enter your authentication code'>
            <Head title="Email Verification" />

            <form onSubmit={submit}>
                <div className="flex flex-col items-center">
                    <InputOtp className='items-center' value={data.code} onChange={(e) => setData('code', e.value)} length={6} inputTemplate={customInput} />
                    <div className="flex justify-between mt-5 self-stretch">
                        <Button size='normal' className='ml-auto' disabled={processing} >Submit code</Button>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
