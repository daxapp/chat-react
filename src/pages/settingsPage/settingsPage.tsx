import { FC, useEffect } from 'react';
import './settingsPage.scss'
import MessageItem from '../../components/specific/messageItem/messageItem';
import defaultImg from '../../assets/img/default-ava.png'
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { FontFamily } from '../../slice/settings/type';

const SettingsPage:FC = () => {
    const {textSize, fontFamily, isCtrl} = useTypedSelector(state => state.settings)
    const {setTextSize, setFontFamily, setIsCtrl} = useActions()


    const changeTextSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setTextSize(e.target.value)
        }
    }

    const changeFontFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const inputValue = e.target.value

        const matchedFont = Object.values(FontFamily).find((font) => font === inputValue);
      
        if (matchedFont) {
          setFontFamily(matchedFont as FontFamily);
        }
    }

    useEffect(() => {
        localStorage.setItem("textSize", textSize)
    }, [textSize])

    
    useEffect(() => {
        localStorage.setItem("fontFamily", fontFamily)
    }, [fontFamily])

    useEffect(() => {
        localStorage.setItem("isCtrl", `${isCtrl}`)
    }, [isCtrl])

    return (
        <div className='container'>
            <div className='settings-page'> 
                <h2 className='settings-page__title'>Settings</h2>
                <div className="settings-page__tools">
                    <div className="settings-page__messages">
                        Text
                    </div>
                    <div className="settings-page__font-size">  
                        <input onChange={(e) => changeTextSize(e)} value={ textSize || 14 } name='text-size' type='range' min={5} max={28} />
                        <label htmlFor='text-size' className="settings-page__descr">Change text size</label>
                    </div>
                    <div className="settings-page__font-family">
                        <select value={fontFamily} name="font-family"  onChange={(e) => changeFontFamily(e)}>
                            <option className='font-family__default' value="Roboto">Default</option>
                            <option className='font-family__fredoka' value="Fredoka">Fredoka</option>
                            <option className='font-family__notoSant' value="Noto Sans">Noto Sans</option>
                            <option className='font-family__hubballi' value="Hubballi">Hubballi</option>
                            <option className='font-family__greatVibes' value="Great Vibes">Great Vibes</option>
                            <option className='font-family__aguDisplay' value="Agu Display">Agu Display</option>
                        </select>
                        <label htmlFor='font-family' className="settings-page__descr">Change font interface</label>
                    </div>
                    <div className="settings-page__messages">Messages</div>
                    <div className="settings-page__enter">
                        <label data-m className="settings-page__descr">
                            <input checked={!isCtrl} type='radio' name='enter' className="settings-page__checkbox" value={'enter'} onChange={() => setIsCtrl()}/> Send with Enter                    
                        </label>
                        <label  className="settings-page__descr">
                            <input checked={isCtrl}  type='radio' name='enter' className="settings-page__checkbox" value={'ctrlEnter'} onChange={() => setIsCtrl()}/> Send with Ctrl+Enter
                        </label>
                    </div>   
                </div>
            </div>
            <MessageItem
                name='Noname'
                time={`12:34`}
                message='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum mollitia reiciendis veniam facere, enim hic blanditiis. Obcaecati, sint? Corporis fuga commodi ut cum incidunt expedita reprehenderit illo! Quas, hic consequatur.'
                avatar={{name: 'Default', img: defaultImg}}
                isMine={false}/>
        </div>
    )
};

export default SettingsPage;
