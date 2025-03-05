import { FC, memo } from 'react';
import { IFruit } from '../changePhotoModal/changePhotoModal';
import usePhoto from '../../../hooks/usePhoto';

interface IMessageItem {
    name: string;
    time: string;
    message: string;
    avatar: IFruit;
    isMine: boolean;
}

const MessageItem:FC<IMessageItem> = memo(({name, time, message, avatar, isMine }:IMessageItem) => {
    const {convertPhoto} = usePhoto()
    return (
        <div className={`chat__message ${isMine ? 'chat__message_me' : ''}`}>
            <div className="chat__message_avatar">
                <img src={convertPhoto(avatar)} alt="ava"/>
            </div>
            <div className="chat__message_content">
                <div className="chat__message_info">
                    <div className="chat__message_name">{name}</div>
                    <div className="chat__message_date">{time}</div>
                </div>
                <div className="chat__message_text">{message}</div>
            </div>
        </div>
    )
});

export default MessageItem;
