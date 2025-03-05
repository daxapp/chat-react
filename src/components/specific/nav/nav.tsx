import { FC, memo } from "react";
import NavList from "../navList/navList";
import { TOnChangeActive,  INavButtons} from "../../App/App";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface IIsHomePage {
    isHomePage: boolean;
    data: INavButtons[];
    onChangeActive: TOnChangeActive;
}

const Nav: FC<IIsHomePage> = memo(({isHomePage, data, onChangeActive}: IIsHomePage) => {
    const {currentUser} = useTypedSelector(state => state.auth)

    return (
        <nav className="chat__nav">
            { !isHomePage ?         
                <NavList onChangeActive={onChangeActive} data={[data[0]]}/>   
                :
                <NavList onChangeActive={onChangeActive} data={data}/>                
            }
            <div className="user-code">
                Your Code: {
                    currentUser 
                    ?
                    <span>
                        {currentUser.uid.slice(0,6)}
                    </span>
                    
                    :
                    'not found'
                }
            </div>
        </nav>
    )
});

export default Nav;
