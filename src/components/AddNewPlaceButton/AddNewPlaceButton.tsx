import React from 'react';
import styles from './AddNewPlaceButton.module.scss';

interface AddNewPlaceButtonProps {
    onClick: () => void;
}

const AddNewPlaceButton: React.FC<AddNewPlaceButtonProps> = ({ onClick }) => {
    return (
        <div className={styles['add-new-place-button']} onClick={onClick}>
            <div className={styles['icon']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM13 7H11V11H7V13H11V17H13V13H17V11H13V7Z"
                        fill="#007aff"
                    />
                </svg>
            </div>
            <span className={styles['text']}>Add new place</span>
        </div>
    );
};

export default AddNewPlaceButton;
