import { memo, useEffect, useMemo, useRef } from 'react';
import MessageItem from '../messageItem/messageItem';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import useHttp from '../../../hooks/useHttp/useHttp';
import usePhoto from '../../../hooks/usePhoto';
import useMessages from '../../../hooks/useMessages/useMessages';
import useConversation from '../../../hooks/useConversation/useConversation';
import Button from '../../basic/button/button';
import { useTour } from '@reactour/tour';
import { steps } from '../../../index';
import TextFieldInput from '../textFieldInput/textFieldInput';
 
const TextField = memo(() => {
    const {currentCompanion, messages, conversationsData, isModal} = useTypedSelector(state => state.chat)
    const {photoUrl} = useTypedSelector(state => state.profile)
    const {currentUser} = useTypedSelector(state => state.auth)
    const { users } = useHttp();
    const {convertPhoto} = usePhoto()
    const {getMessages} = useMessages();
    const {conversations} = useConversation()
    const {setIsOpen, setSteps, setCurrentStep} = useTour()
    
    const userCompanion = users?.filter(item => item.uid === currentCompanion)[0]

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getMessages();
    }, [currentCompanion, conversations]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages])

    useEffect(() => {
        setCurrentStep(0);
        if (isModal == true && setSteps) {
            setSteps([
                {
                    selector: '.modal__input',
                    content: 'Here you can insert code 6 characters are required'
                },
                {
                    selector: '.modal__submit',
                    content: "Press and enjoy"
                }
            ])
        } else {
            if (setSteps) {
                setSteps(steps) 
            }
            
        }
    }, [isModal, setCurrentStep, setSteps])

    const memorizedMessages = useMemo(() => {
        return messages?.map(({displayName, text, createdAt, uidSender, messageId}) => {
            return <MessageItem 
                        key={messageId}
                        name={currentUser?.changedName || displayName}
                        avatar={currentUser?.uid === uidSender ? currentUser?.changedPhoto : userCompanion?.changedPhoto}
                        message={text}
                        isMine={currentUser?.uid === uidSender}
                        time={new Date(createdAt).toLocaleTimeString().slice(0, -3)}/>
        })
    }, [messages,currentUser?.changedName, currentUser?.changedPhoto, currentUser?.uid, userCompanion?.changedPhoto])

    return !!currentCompanion ? 
        (
            <>
                <div className="chat__tools">
                    <div className="chat__tools_avatar">
                        <img src={convertPhoto(userCompanion ? userCompanion?.changedPhoto : photoUrl)} alt="ava"/>
                    </div>
                    <div className="chat__tools_name">{userCompanion?.changedName ? userCompanion?.changedName : userCompanion?.displayName}</div>
                </div>
                <div className="chat__field" >
                    {memorizedMessages}
                    <div ref={messagesEndRef} />
                </div >
                <TextFieldInput/>
            </>
        ) 
        :
        (
            <div className="center" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10 + 'px'
            }}>
                {conversationsData?.length === 0 ?
                    <>
                        <span>
                        To start chating with friends follow the instructions
                        </span>
                        <Button onClick={() => setIsOpen(true)}>
                            Show instructions
                        </Button>
                    </>
                    :
                    "Select a chat and start messaging"
                }
            </div>
        ) 
});

export default TextField;


