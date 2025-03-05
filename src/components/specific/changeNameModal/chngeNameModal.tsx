import { FC, memo } from 'react';
import BasicModal from '../../basic/basicModal/BasicModal';
import { useActions } from '../../../hooks/useActions';


const ChangeNameModal:FC = memo(() => {
    const {setName, setIsModal} = useActions();

    const onChangeName = (value: string) => {
        setName(value);
        setIsModal(false)
    }
    return (
        <BasicModal 
            buttonContent='Change' 
            titleContent='Change name'
            onButtonClick={onChangeName}
            requiredAmountNumber={[4, 10]}>

        </BasicModal>
    )
});

export default ChangeNameModal;
