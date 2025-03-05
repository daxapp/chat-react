import { FruitName, IFruit } from "../components/specific/changePhotoModal/changePhotoModal";
import appleImg from '../assets/img/avatar-apple.png';
import ananasImg from '../assets/img/avatar-ananas.png';
import grapeImg from '../assets/img/avatar-grape.png';
import kiviImg from '../assets/img/avatar-kivi.jpg';
import straberyImg from '../assets/img/avatar-strabery.png';
import defaultImg from '../assets/img/default-ava.png'
import { useCallback } from "react";

const usePhoto = () => {
    const convertPhoto = useCallback((photo: IFruit) => {
        if (photo) {
            switch (photo.name) {
                case FruitName.Apple:
                    return appleImg;
                case FruitName.Ananas:
                    return ananasImg;
                case FruitName.Grape:
                    return grapeImg;
                case FruitName.Kivi:
                    return kiviImg;
                case FruitName.Strawberry:
                    return straberyImg;
                case FruitName.Default:
                    return defaultImg
                default:
                    return defaultImg;
            }
        } else {
            return defaultImg
        }

    }, []);

    return { convertPhoto };
};

export default usePhoto;