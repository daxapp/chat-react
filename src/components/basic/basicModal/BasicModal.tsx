import { FC, memo, useEffect, useRef, useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import Button from '../button/button';
import './addConversationModal.scss';
import { KeyboardEvent } from 'react';

interface IBasicModal {
    buttonContent: string;
    titleContent: string;
    onButtonClick: (value:  string) => Promise<void> | any | void;
    children?: React.ReactNode;
    requiredAmountNumber?: number[];   
    isPhoto?: boolean;
    isDisabled?: boolean
}

const BasicModal: FC<IBasicModal> = memo(({ buttonContent, titleContent, onButtonClick, children, requiredAmountNumber = [6, 6], isPhoto = false, isDisabled}: IBasicModal) => {
    const [value, setValue] = useState<string>(''); 

    const ref = useRef<HTMLInputElement>(null);

    const { setIsModal } = useActions();

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, []);

    const onChangeValue = (value: string) => {
        if (value.length <= requiredAmountNumber[1]) {
            setValue(value);
        }
    };


    const pressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !(value.length < requiredAmountNumber[0] || value.length > requiredAmountNumber[1])) {    
            onButtonClick(value);
        }
    };

    return (
        <div className='modal'>
            <div className="modal__close" 
                onClick={() => setIsModal(false)}
                aria-label="Close modal">
                &#215;
            </div>
            <div className="modal__title">
                {titleContent}
            </div>
            {
                isPhoto ? 
                <>
                    {children} 
                    <div className="modal__submit">
                        <Button onClick={() => onButtonClick(value)}  
                            isDisabled={isDisabled}>
                            {buttonContent}
                        </Button>
                    </div>
                </>
                :
                <>
                    <div className="modal__inputer">

                        <input 
                            ref={ref}
                            className='modal__input' 
                            placeholder='Type...' 
                            type="text" 
                            value={value} 
                            onKeyDown={(e) => pressEnter(e)}
                            onChange={(e) => onChangeValue(e.target.value)} />
                    </div>
                    <div className="modal__submit">
                        <Button onClick={() => onButtonClick(value)}  
                            isDisabled={value.length < requiredAmountNumber[0] || value.length > requiredAmountNumber[1]}>
                            {buttonContent}
                        </Button>
                    </div>
                    {children}
                </>
            }
        </div>
    );
});

export default BasicModal;





