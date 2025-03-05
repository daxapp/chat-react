import { FC } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import './homePage.scss'
import colibri from '../../assets/img/colibri.png'
import useUser from "../../hooks/useUser/useUser";

const HomePage: FC = () => {
    const {user, login, exit} = useAuth();
    const {addUser} = useUser();
    

    return (
        <div className="home-page"> 
            <div className="home-page__container">
                <h1 className="home-page__title">Welcome to Colibri - Connect with the world!</h1>
                <div className="home-page__img">
                    <img src={colibri} alt="" />
                </div>
            {
                user ?
                (
                    <button className="home-page__btn" onClick={exit}>Exit</button>
                ) 
                :
                (
                    <button className="home-page__btn" onClick={() => {
                        login();
                        addUser()
                    }}>Get start with google</button>  
                )
            }
            </div>
        </div>
    )
};

export default HomePage;
