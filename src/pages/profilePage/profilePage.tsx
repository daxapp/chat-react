import { FC, useEffect, useState } from 'react';
import './profilePage.scss';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ChangeNameModal from '../../components/specific/changeNameModal/chngeNameModal';
import ChangePhotoModal from '../../components/specific/changePhotoModal/changePhotoModal';
import usePhoto from '../../hooks/usePhoto';
import useUser from '../../hooks/useUser/useUser';


const ProfilePage:FC = () => {
    const {setIsModal} = useActions()
    const {name, photoUrl} = useTypedSelector(state => state.profile)
    const {isModal} = useTypedSelector(state => state.chat);
    const {currentUser} = useTypedSelector(state => state.auth)
    const {changeName, changePhoto} = useUser()
    const [modalActive, setModalActive] = useState<'photo' | 'name' | ''>('')
    const {convertPhoto} = usePhoto();

    useEffect(() => {
        if (name) {
            changeName();   
        }
    }, [name, changeName])

    useEffect(() => {
        if (photoUrl) {
            changePhoto()
        }
    }, [photoUrl, changePhoto])

    const showModal = () => {
        if (modalActive === 'name') {
            return <ChangeNameModal/>
        } else if (modalActive === 'photo') {
            return <ChangePhotoModal />
        } else {
            return null
        }
    }

    return (
        <>
            {isModal ? showModal() : null}
            <div className='profile-page'>
                <h2 className='profile-page__title'>Profile</h2>
                <div className="profile-page__information">
                    <div className="profile-page__foto">
                        <div className="profile-page__ava">
                            <img src={convertPhoto(currentUser ? currentUser.changedPhoto : photoUrl)} alt="avatar" />
                        </div>
                        <button className='profile-page__change' onClick={() => {setIsModal(true); setModalActive('photo')}} >Change</button>
                    </div>
                    <div className="profile-page__name profile-page__info">
                        <span>Name: </span>
                        {currentUser?.changedName || currentUser?.displayName}
                        <button className='profile-page__change' onClick={() => {setIsModal(true); setModalActive('name')}}>Change</button>
                    </div>
                    <div className="profile-page__phone-number profile-page__info">
                        <span>Phone number: </span>
                        {currentUser?.phoneNumber || 'is not specified'}
                    </div>
                    <div className="profile-page__gmail profile-page__info">
                        <span>Email: </span>
                            {currentUser?.email}
                    </div>
                </div>
            </div>
        </>
        
    )
};

export default ProfilePage;
