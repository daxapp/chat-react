import { FC, memo } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import magnifyingGlass from '../../../assets/icons/magnifying-glass.png'

const ConversationsTools:FC = memo(() => {
    const {setIsModal, setConversationsFilterWord} = useActions()
    const {conversationsData} = useTypedSelector(state => state.chat)
    return (
        <div className="chat__flex">
            <div className="chat__flex-item">
                <div className="chat__flex-title">Conversations ({conversationsData?.length})</div>
                <button className="chat__flex-new" onClick={() => setIsModal(true)} >
                    New conversation
                </button>
            </div>
            <div className="chat__flex-item">
                <div className="div">
                    <input type="text" onChange={(e) => setConversationsFilterWord(e.target.value)} className="chat__flex-input" placeholder="Search..."/>
                    <div className="chat__flex-img">
                        <img src={magnifyingGlass} alt="glass"/>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default ConversationsTools;
