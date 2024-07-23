import GuestLayout from '@layouts/GuestLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';
import { FaMinus } from 'react-icons/fa';

export default function VerifyEmail({ status, code, error, message = '' }: { message?: string; status?: string, code: any, error?: string }) {
    const { post, processing, setData, data, wasSuccessful } = useForm<{ verification_code: string | number | null | undefined }>({ verification_code: null });

    const customInput = ({ events, props: { key, unstyled, invalid, ...props } }: any) => {
        return <React.Fragment key={key}><input
            {...events}
            {...props}
            type="text"
            className="custom-otp-input-sample"
            invalid={invalid + ''}
        />
            {props.id === 2 && <div className="px-3">
                <FaMinus />
            </div>}
        </React.Fragment>
    };

    if (status == 'success') {
        setTimeout(() => {
            router.visit(route('user.dashboard'));
        }, 2000);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('user.verify.check'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status === 'sent'
                        ? <>A new verification link has been sent to the email address you provided during registration.</>
                        : status == 'expired'
                            ? <span className='text-orange-500'>Verification code has expired</span>
                            : status === 'error' ?
                                <span className='text-red-500'>{error}</span> : ''
                    }
                </div>
            )}

            <form onSubmit={submit}>
                <div className="flex flex-col items-center">
                    <p className="font-bold text-xl mb-2">Authenticate Your Account</p>
                    <p className="text-color-secondary block mb-5">Please enter the code sent to your phone.</p>
                    <InputOtp className='input' value={data.verification_code} onChange={(e) => setData('verification_code', e.value)} length={6} inputTemplate={customInput} />
                    <div className="flex justify-between mt-5 self-stretch">
                        <Link
                            href={route('user.verification.send')}
                            method="post"
                            as="button"
                            onClick={(e) => {
                                e.preventDefault();
                                post(route('user.verification.send'));
                            }}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Resend Code
                        </Link>
                        <Button disabled={processing} label="Submit Code"></Button>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
