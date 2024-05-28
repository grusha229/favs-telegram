import React, { useState, FormEvent } from 'react';
import styles from './ReportIssuePage.module.scss';
import optionStyles from '../../components/Option/Option.module.scss';
import Option from '../../components/Option/Option.tsx';

export default function ReportIssuePage() {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        alert(`You reported: ${selectedOption}`);
        // Здесь вы можете добавить логику для отправки отчета на сервер
    };

    const options = [
        'Address is wrong',
        'Serving a different roaster',
        "Photos aren't very good",
        'Temp closed',
        'Perm closed',
        'Overall quality',
        'Other'
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
