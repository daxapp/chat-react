import Nav from "../specific/nav/nav";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../specific/appRouter/appRouter";
import useAuth from "../../hooks/useAuth/useAuth";
import { useEffect, useState } from "react";
import homeImg from '../../assets/icons/home.png'
import homeImgAtive from '../../assets/icons/home-active.png'
import messageImg from '../../assets/icons/chat.png'
import messageImgActive from '../../assets/icons/chat-active.png'
import profileImg from '../../assets/icons/group-users.png'
import profileImgActive from '../../assets/icons/group-users-active.png'
import settingsImg from '../../assets/icons/settings.png'
import settingsImgActive from '../../assets/icons/settings-active.png'
import Loader from "../basic/loader/loader";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { FontFamily } from "../../slice/settings/type";
import "react-toastify/dist/ReactToastify.css";
export type TOnChangeActive = (trigger: number) => void;

export interface INavButtons { 
    name: string;
    active: boolean;
    path: string[];
}


function App() {
    let {user, loading} = useAuth();

    const isModal = useTypedSelector(state => state.chat.isModal);

    const {textSize, fontFamily} = useTypedSelector(state => state.settings)

    const {setIsModal, setTextSize, setFontFamily, setIsCtrl} = useActions()

    const [navButtons, setNavButtons] = useState<INavButtons[]>([
        {
            name: 'Home',
            active: !(!!user),
            path: [homeImg, homeImgAtive]
        },
        {
            name: 'Message',
            active: false,
            path: [messageImg, messageImgActive]
        },
        {
            name: 'Profile',
            active: false,
            path: [profileImg, profileImgActive]
        },
        {
            name: 'Settings',
            active: false,
            path: [settingsImg, settingsImgActive]
        }
    ]);


    useEffect(() => {
        const textSize = localStorage.getItem('textSize');
        const fontFamily = localStorage.getItem('fontFamily');
        const isCtrl = localStorage.getItem('isCtrl');

        if (textSize) {
            setTextSize(textSize)
        }

        if (fontFamily) {
            setFontFamily(fontFamily as FontFamily)
        }

        if (isCtrl) {
            setIsCtrl(JSON.parse(isCtrl))
        }
            
    }, [])
    


    const onChangeActive: TOnChangeActive = (trigger: number) => {
        setNavButtons((prevState) => {
            const result = prevState.map((item) => {
                return {...item, active:false}
            })
            return result.map((item, i) => {
                if (trigger === i) {
                    return {...item, active:true}
                } else {
                    return item
                }
            })
        })
    }

    return loading ?
        (
            <div className="center">
                <Loader/>  
            </div>
        )
        :
        (   
            <>
            <BrowserRouter>
                <div className="chat" style={{ '--var-width': `${textSize}px` , fontFamily: `${fontFamily}, serif` } as React.CSSProperties}>
                    <div className="chat__item">
                        <Nav isHomePage={!!user} onChangeActive={onChangeActive} data={navButtons}/>
                    </div>
                    <AppRouter user={!!user} data={navButtons}/>
                </div>
                {isModal ? <div className="underlay" onClick={() => setIsModal(false)}></div> : null}
            </BrowserRouter>
            </>

        );
}

export default App;




