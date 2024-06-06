import React, { useState, useCallback } from 'react';
import styles from './ReportIssuePage.module.scss';
import Option from '../../components/Option/Option.tsx';
import { useNavigate, useParams } from 'react-router-dom'
import {useSelector} from "react-redux";
import {IStateInterface} from "../../store/store";
import MapService  from "../../http/MapService.ts";
import Button from '../../components/Button/Button.tsx';
import {
    useBackButton,
  } from '@tma.js/sdk-react';

export default function ReportIssuePage() {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const params = useParams();
    const USER_TOKEN = useSelector((state: IStateInterface) => state.authentication.token)
    const USER_ID = useSelector((state: IStateInterface) => state.authentication.telegramID)
    const PLACE_NAME = useSelector((state: IStateInterface) => state.placesList.current?.name)
    const PLACE_ID = params?.place_id
    const navigate = useNavigate();

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const reportBody = {
        description: selectedOption,
        reported_by: USER_ID.toString()
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        MapService
            .reportPlace(USER_TOKEN, USER_ID, PLACE_ID, reportBody)
            .then(response => {
                alert(`Report successful: ${response.data}`);})
            .catch(error => {
                console.error(`Error reporting place: ${error}`);
        });
    },[]);

    const handleBackClick = () => {
        navigate(-1);
    }

    const backButton = useBackButton();
    backButton.show()
    backButton.on('click', () => {
        handleBackClick()
    })

    const options = [
        'Address is wrong',
        'Serving a different roaster',
        "Photos aren't very good",
        'Temp closed',
        'Perm closed',
        'Overall quality',
    ];

    return (
        <div className={styles['report-issue-container']}>
            <h2>Help improve Source by reporting feedback on {PLACE_NAME}.</h2>
            <form className={styles['report-form']} onSubmit={handleSubmit}>
                <div className={styles['options']}>
                    {options.map((option) => (
                        <div key={option}>
                            <Option
                                label={option}
                                value={option}
                                checked={selectedOption === option}
                                onChange={handleOptionChange}
                            />
                        </div>
                    ))}
                </div>
            </form>
            <Button
                type="primary"
                onClick={handleSubmit}
                disabled={!selectedOption}
                block
            >
                Submit
            </Button>
        </div>
    );
}