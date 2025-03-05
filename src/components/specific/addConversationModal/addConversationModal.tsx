import { FC, memo, useState } from 'react';
import './addConversationModal.scss';
import BasicModal from '../../basic/basicModal/BasicModal';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import useConversation from '../../../hooks/useConversation/useConversation';

const AddConversationModal:FC = memo(() => {
    const [isEnaible, setIsEnaible] = useState<string>('');
    const {setIsModal} = useActions();
    const {onAddConversation} = useConversation();
    const {currentUser} = useTypedSelector(state => state.auth)

    const onConversationEnaible = async (value: string | undefined) => {
        if (value === currentUser?.uid.slice(0, 6)) {
            setIsEnaible('do not try enter your own code)')
            return 
        }
        const res = await onAddConversation(value);
        if (res) {
            setIsModal(false)
        } else {
            setIsEnaible('this user does not exist')
        }
    }

    return (
        <BasicModal 
            titleContent='Enter Code' 
            buttonContent='Add conversation'
            onButtonClick={onConversationEnaible}>
                {isEnaible.length ? <h3>{isEnaible}</h3>: null}
        </BasicModal>
    )
});

export default AddConversationModal;
