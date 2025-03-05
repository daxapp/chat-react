import { FC, memo, useState } from 'react';
import BasicModal from '../../basic/basicModal/BasicModal';
import { useActions } from '../../../hooks/useActions';
import appleImg from '../../../assets/img/avatar-apple.png';
import ananasImg from '../../../assets/img/avatar-ananas.png';
import grapeImg from '../../../assets/img/avatar-grape.png';
import kiviImg from '../../../assets/img/avatar-kivi.jpg';
import straberyImg from '../../../assets/img/avatar-strabery.png';
import defaultImg from '../../../assets/img/default-ava.png'

const ChangePhotoModal:FC = memo(() => {
    const {setPhotoUrl, setIsModal, setDefaultPhoto} = useActions()
    const [selectedFruit, setSelectedFruit] = useState<IFruit>();

    const onChangePhoto = () => {
        if (selectedFruit?.name === FruitName.Default) {
            setDefaultPhoto()
        } else if (selectedFruit) {
            setPhotoUrl(selectedFruit);
        }
        setIsModal(false)
    }

    return (
        <BasicModal 
            buttonContent='Confirm'
            titleContent='Change Photo'
            onButtonClick={onChangePhoto}
            isDisabled={!(!!selectedFruit)}
            isPhoto
            >
                <FruitSelector selectedFruit={selectedFruit} setSelectedFruit={setSelectedFruit}/>
        </BasicModal>
    )
});

export default ChangePhotoModal;

export interface IFruit {
    name: string;
    img: string;
}

interface IFruitSelectorProps {
    selectedFruit: IFruit | undefined;
    setSelectedFruit: React.Dispatch<React.SetStateAction<IFruit | undefined>>
}

export enum FruitName {
    Apple = "Apple",
    Ananas = "Ananas",
    Grape = "Grape",
    Kivi = "Kivi",
    Strawberry = "Strawberry",
    Default = "Default"
}
  
const fruits = [
    { name: FruitName.Apple, img: appleImg },
    { name: FruitName.Ananas, img: ananasImg },
    { name: FruitName.Grape, img: grapeImg },
    { name: FruitName.Kivi, img: kiviImg },
    { name: FruitName.Strawberry, img: straberyImg },
    { name: FruitName.Default, img: defaultImg }
];


const FruitSelector:FC<IFruitSelectorProps> = memo(({selectedFruit, setSelectedFruit}: IFruitSelectorProps) => {
    return (
      <div className="img-container">
        {fruits.map((fruit) => (
            <div
                key={fruit.name}
                className={`profile-page__ava ${selectedFruit === fruit ? 'active' : ''}`}
                onClick={() => setSelectedFruit(fruit)}>
                <img src={fruit.img} alt={fruit.name} />
            </div>
        ))}
      </div>
    );
  })
  
  