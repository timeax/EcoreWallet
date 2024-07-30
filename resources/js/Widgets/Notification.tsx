import IconButton from "@components/Button/IconButton";
import { Title } from "@components/Trade";
import React from "react";

const Notification: React.FC<NotificationProps> = ({ title, data: info, date }) => {
    //--- code here ---- //
    return (
        <>
            <div className="mx-notice-box flex flex-col gap-1">
                <div className="title-box">
                    <Title sm bold noPad className="title">{title}</Title>
                </div>
                <div className="info-box flex items-center">
                    <Title noPad sm bright normal className="info">{info}</Title>
                </div>
                <div className="flex justify-between items-center">
                    <Title noPad normal xs className="gap-1">
                        <i>
                            {new Date(date).toLocaleDateString(undefined, {
                                dateStyle: "medium",
                            })}
                        </i>
                        <i>at</i>
                        <i>{new Date(date).toLocaleTimeString()}</i>
                    </Title>
                    <IconButton variant="none">
                        <i className="pi pi-angle-right"></i>
                    </IconButton>
                </div>
            </div>
        </>
    );
}

interface NotificationProps {
    title: string;
    data: string;
    date: string
}

export default Notification
