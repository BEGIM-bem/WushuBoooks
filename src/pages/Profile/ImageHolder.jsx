import React, { useRef, useState } from 'react';
import Button from '../../components/Button';
import { ProfileImage } from '../../images/inedex';
import styles from './profile.module.css';

const ImageHolder = ({image}) => {
    const imgInput = useRef(null);

    const [profileImage, setProfileImage] = useState(image ? image : null);
    const [newImage, setNewImage] = useState(null);

    const handleProfileImage = () => {
        if (newImage) return newImage;
        if (profileImage) return profileImage;
        return ProfileImage;
    }

    const handleImageInputChange = (e) => {
        setProfileImage(e.target.files[0]);
        const file = e.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = (e)=>{
            setNewImage(reader.result);
        }
    }

    const handleButtonClick = () => {
        imgInput?.current.click();
        console.log("click");
    }
    return (
        <div className={styles.profile_img_board}>
            <img 
            src={handleProfileImage()}
            alt="profile avatar"
            className={styles.profile_img}/>
            <div className={styles.image_button_holder}>
                <Button
                type="button"
                onClick={handleButtonClick}
                projectType="secondary">Загрузить изображение</Button>
                <input
                ref={imgInput}
                className={styles.img_input}
                onChange={handleImageInputChange}
                type="file"
                accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"/>
            </div>
        </div>
    )
}

export default ImageHolder
