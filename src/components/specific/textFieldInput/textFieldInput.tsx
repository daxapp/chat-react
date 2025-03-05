import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import useMessages from '../../../hooks/useMessages/useMessages';


const TextFieldInput:FC = ({}) => {
    const [value, setValue] = useState('')
    const {isCtrl} = useTypedSelector(state => state.settings)
    const {loadingMessage, messages} = useTypedSelector(state => state.chat)
    const {sendMessageInConversation} = useMessages()

    const inputRef = useRef<HTMLTextAreaElement>(null)

    const pressEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (isCtrl ? event.ctrlKey : true) {
            if (event.key === 'Enter') {    
                sendMessageInConversation(value);
                setValue('')
            }
        }
    } 

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [messages])

    return (
        <div className="chat__input">
            <textarea 
                ref={inputRef}
                onKeyDown={pressEnter}
                onChange={(e) => {setValue(e.target.value)}} 
                name="message" 
                value={value} 
                disabled={loadingMessage}
                placeholder="Type here..."></textarea>
            <button className="chat__input_button" disabled={loadingMessage} onClick={() => {
                sendMessageInConversation(value); 
                setValue('')
            }}>Send</button>
        </div>
    )
};

export default TextFieldInput;
