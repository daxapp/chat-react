import { FC, memo } from 'react';
import { useActions } from '../../../hooks/useActions';
import usePhoto from '../../../hooks/usePhoto';
import { IFruit } from '../changePhotoModal/changePhotoModal';

interface ChatListItemProps {
    companion: string;
    ava: IFruit;
    active: boolean;
    name: string;
    time: string;
    lastMessage: string;
    isYou: boolean
}


const ChatListItem:FC<ChatListItemProps> = memo(({companion, ava, active, name, time, lastMessage, isYou}: ChatListItemProps) => {
    const {setCurrentCompanion} = useActions();
    const {convertPhoto} = usePhoto();

    return (
        <li className="chat__conversation" onClick={() => setCurrentCompanion(companion)}>
            {
                active ? 
                <div className="chat__conversation-stick"></div> 
                :
                null
            }
            
            <div className="chat__avatar">
                <img src={convertPhoto(ava)} alt="ava" />
            </div>
            <div className="chat__info">
                <div className="chat__header">
                    <div className="chat__name">{name}</div>
                    <div className="chat__time">{time}</div>
                </div>
                <div className="chat__footer">
                    <div className="chat__last-message">{lastMessage ? isYou ? 'You: ' : `${name}: ` : ''}{ lastMessage ? lastMessage.length > 20 ? lastMessage.slice(0,20)+'...' : lastMessage : 'There is no massages'}</div>
                </div>
            </div>
        </li>
    )
});

export default ChatListItem;
