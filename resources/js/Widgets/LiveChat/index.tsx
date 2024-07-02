import React from 'react';
import styles from '@styles/widgets/chat.module.scss'
import { classNames } from 'primereact/utils';
import { FaBars, FaFile, FaLaughBeam } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
const ChatWidget: React.FC<ChatWidgetProps> = () => {
    //--- code here ---- //
    return (
        <div className={styles.center}>
            <div className={styles.contacts}>
                <FaBars />
                <h2>History</h2>
            </div>
            <div className={styles.chat}>
                <div id='chat' className={styles.messages}>
                    <div className={styles.time}>Today at 11:41</div>
                    <Message from='admin' msg={'This is From admin'} />
                    <Message from='user' msg={'This is me, the user'} />
                    <Typing for='admin' show={true} />
                </div>
                <div className={styles.input}>
                    <FaFile />
                    <FaLaughBeam />
                    <input type="text" placeholder='Type your message here!' />
                    <IoMdSend />
                </div>
            </div>
        </div>
    );
}


export const Message: React.FC<MessageProps> = ({ msg, from, repliedTo, file = '', type = 'text' }) => {
    //--- code here ---- //
    return (
        <div className={classNames(styles.message, styles[from])}>
            {msg}
        </div>
    );
}


export const Typing: React.FC<TypingProps> = ({ for: showFor, show }) => {
    //--- code here ---- //
    return (
        show ? <div className={classNames(styles.message, styles[showFor])}>
            {[1, 2, 3].map(index => <div key={index} className={classNames(styles.typing, styles['typing-' + index])}></div>)}
        </div> : ''
    );
}

interface TypingProps {
    show?: boolean;
    for: 'user' | 'admin'
}


interface MessageProps {
    from: 'user' | 'system' | 'admin' | 'banner';
    msg: any;
    repliedTo?: number;
    file?: string;
    type?: 'file' | 'text'
}



interface ChatWidgetProps {

}

export default ChatWidget
