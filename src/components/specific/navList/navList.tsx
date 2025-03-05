import { FC, memo } from 'react';
import {INavButtons} from '../../App/App'
import NavListItem from '../navListItem/navListItem';

interface INavListProps {
    data: INavButtons[];
    onChangeActive: (trigger: number) => void;
}

const NavList:FC<INavListProps> = memo(({data, onChangeActive}:INavListProps) => {

    return (
        <ul className="chat__ul">
            {data.map(({name, active, path}, i) => {
                return <NavListItem 
                    key={name}
                    on={onChangeActive}
                    name={name} 
                    active={active} 
                    path={path}
                    i={i}/>
            })}
        </ul>
    )
});

export default NavList;
