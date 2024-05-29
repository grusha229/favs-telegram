import React, { useState, FormEvent } from 'react';
import styles from './ReportIssuePage.module.scss';
import optionStyles from '../../components/Option/Option.module.scss';
import Option from '../../components/Option/Option.tsx';
import { useParams } from 'react-router-dom'
import {useSelector} from "react-redux";
import {IStateInterface} from "../../store/store";
import MapService  from "../../http/MapService.ts";

export default function ReportIssuePage() {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const params = useParams();
    const USER_TOKEN = useSelector((state: IStateInterface) => state.authentication.token)
    const USER_ID = useSelector((state: IStateInterface) => state.authentication.telegramID)
    const PLACE_ID = params?.place_id

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const reportBody = {
        description: selectedOption,
        reported_by: USER_ID.toString()
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        MapService
            .reportPlace(USER_TOKEN, USER_ID, PLACE_ID, reportBody)
            .then(response => {
                alert(`Report successful: ${response.data}`);})
            .catch(error => {
                console.error(`Error reporting place: ${error}`);
        });
    };

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
            <header>
                <button className={styles['cancel-button']}>Cancel</button>
                <h1>Report</h1>
                <button
                    className={styles['submit-button']}
                    onClick={handleSubmit}
                    disabled={!selectedOption}
                >
                    Submit
                </button>
            </header>
            <form className={styles['report-form']} onSubmit={handleSubmit}>
                <p>Help improve Source by reporting feedback on Télescope Café.</p>
                <div className={styles['options']}>
                    {options.map((option) => (
                        <div className={optionStyles['option']} key={option}>
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
        </div>
    );
};
