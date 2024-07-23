import Button from '@components/Button';
import { routeById } from '@routes/index';
import { PageProps } from '@typings/index';
import React from 'react';

const Onboarding: React.FC<OnboardingProps> = () => {
    //--- code here ---- //
    return (
        <>
            <Button href={route(routeById('dashboard').route)}>Go to Dashboard</Button>
        </>
    );
}

interface OnboardingProps extends PageProps {

}

export default Onboarding
