import { FC, memo } from 'react';
import { INavButtons  } from '../../App/App';

interface INavListItemProps extends INavButtons {
    on: (trigger: number) => void;
    i: number;
}

const NavListItem:FC<INavListItemProps> = memo(({name, active, path, on, i}:INavListItemProps) => {

    const handleClick: React.MouseEventHandler<HTMLLIElement> = () => {
        on(i);
    };
    
    return (
        <li className={`chat__ul-item ${active ? 'chat__ul-item-active': ''}`} onClick={handleClick}>
            <div className="chat__ul-img">
                <img src={active? path[1] : path[0]} alt="icon"/>
            </div>
            <div className="chat__ul-title">{name}</div>
        </li>
    )
});

export default NavListItem;
