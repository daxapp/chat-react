import { FC, memo } from 'react';
import {IButtonProps} from './button.type';

const Button:FC<IButtonProps> = memo(({children, isDisabled = false, onClick}: IButtonProps) => {
    return (
        <button 
            className='btn' 
            disabled={isDisabled}
            onClick={onClick}>
            {children}
        </button>
    )
});

export default Button;
