import React, { useState, FormEvent } from 'react';
import styles from './AddPlacePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStateInterface } from '../../store/store';
import MapService from '../../http/MapService';
import Option from '../../components/Option/Option';
import Button from '../../components/Button/Button';

export default function AddPlacePage() {
    const [link, setMapLink] = useState<string>('');
    const [labels, setLabels] = useState<string[]>([]);
    const navigate = useNavigate();

    const USER_TOKEN = useSelector((state: IStateInterface) => state.authentication.token);
    const USER_ID = useSelector((state: IStateInterface) => state.authentication.telegramID);

    const handleMapLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMapLink(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLabels((prevLabels) =>
            prevLabels.includes(value)
                ? prevLabels.filter((category) => category !== value)
                : [...prevLabels, value]
        );
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const placeData = {
            link,
            labels,
            added_by: USER_ID.toString()
        };

        MapService
            .addPlace(USER_TOKEN, USER_ID, placeData)
            .then((response) => {
                alert(`Place added successfully: ${response.data}`);
                navigate(-1);
            })
            .catch((error) => {
                console.error(`Error adding place: ${error}`);
            });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const categoryOptions = ['cafe', 'coworking', 'library', 'other'];

    return (
        <div className={styles['add-place-container']}>
            <header>
                <Button 
                    type="secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <h2>Add new laptop friendly place</h2>
                <Button
                    onClick={handleSubmit}
                    disabled={!link || labels.length === 0}
                >
                    Send
                </Button>
            </header>
            <form className={styles['add-place-form']} onSubmit={handleSubmit}>
                <div>
                    <div className={styles['subtitle']}>Paste here Google Maps link</div>
                    <input
                        id="map-link"
                        type="text"
                        value={link}
                        onChange={handleMapLinkChange}
                        placeholder="https://maps.app.goo.gl/..."
                    />
                </div>
                <div className={styles['labels']}>
                    <div className={styles['subtitle']}>Choose the labels</div>
                    <div className={styles['category-options']}>
                        {categoryOptions.map((category) => (
                            <Option
                                key={category}
                                label={category}
                                value={category}
                                checked={labels.includes(category)}
                                onChange={handleCategoryChange}
                            />
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
}
